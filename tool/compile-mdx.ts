import { type CompileOptions, compile } from "@mdx-js/mdx";
import { dirname, fromFileUrl, join, relative, resolve } from "@std/path";
import { Cause, Chunk, Console, Effect, Order, Stream } from "effect";
import rehypeMathjax from "rehype-mathjax";
import remarkFrontmatter from "remark-frontmatter";
import remarkLintCheckboxContentIndent from "remark-lint-checkbox-content-indent";
import remarkLintDefinitionSpacing from "remark-lint-definition-spacing";
import remarkLintHeadingIncrement from "remark-lint-heading-increment";
import remarkLintLinebreakStyle from "remark-lint-linebreak-style";
import remarkLintNoConsecutiveBlankLines from "remark-lint-no-consecutive-blank-lines";
import remarkLintNoMissingBlankLines from "remark-lint-no-missing-blank-lines";
import remarkLintNoTabs from "remark-lint-no-tabs";
import remarkMath, { type Options as MathOptions } from "remark-math";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";
import remarkPresetLintConsistent from "remark-preset-lint-consistent";
import remarkPresetLintRecommended from "remark-preset-lint-recommended";
import type { PluggableList } from "unified";
import { VFile } from "vfile";
import { matter } from "vfile-matter";
import { type Options as LintOptions, reporter } from "vfile-reporter";
import {
  type SolutionData,
  categoryList,
  solutionPagesSchema,
  titleList,
} from "../src/utils/solutions.ts";
import { readTextFile, walkDir, writeTextFile } from "./effect-deno.ts";

declare module "vfile" {
  export interface DataMap {
    /**
     * The frontmatter of the file.
     */
    readonly matter: SolutionData;
  }
}

// Change the directory so that relative paths are based on the file, not the CWD.
Deno.chdir(dirname(fromFileUrl(Deno.mainModule)));

// Directories for resolve.
const srcDir = resolve("..", "src");
const contentDir = join(srcDir, "content");
const utilsDir = join(srcDir, "utils");

/**
 * Compile the MDX files into JS.
 */
const program = Effect.gen(function* () {
  const initialFiles = getSolutions(contentDir);
  const compiledFiles = compileSolutions(initialFiles);

  const chunk = yield* compiledFiles.pipe(Stream.runCollect);
  const files = chunk.pipe(Chunk.sort(sortFiles)).pipe(Chunk.toArray);

  yield* Effect.all([
    lint(files),
    writeSolutions(files),
    staticImports(files),
    categories(files),
  ]);

  yield* Console.info(`Compiled ${files.length} MDX files into JS.`);
});

/**
 * Get all of the MDX files in a directory.
 *
 * @param basePath - The path to hunt for MDX files to fetch.
 * @param currentPath - The current path to search for MDX files.
 *
 * @remarks
 * This is an async generator because it's recursive.
 */
const getSolutions = (
  basePath: string,
): Stream.Stream<VFile, Cause.UnknownException> =>
  walkDir(basePath, (e) => new Cause.UnknownException(e), {
    exts: ["mdx"],
  })
    .pipe(Stream.filter((entry) => entry.isFile))
    .pipe(
      Stream.mapEffect((entry) =>
        getSolution(
          entry.path,
          dirname(relative(basePath, entry.path)),
          basePath,
          entry.name,
        ),
      ),
    );

/**
 * Get the contents of a file.
 *
 * @param fullPath - The full path to the file.
 * @param relPath - The relative path to the file.
 * @param fileName - The name of the file.
 * @returns The file's contents.
 */
const getSolution = (
  fullPath: string,
  relPath: string,
  basePath: string,
  fileName: string,
): Effect.Effect<VFile, Cause.UnknownException> =>
  Effect.gen(function* () {
    const fileContent = yield* readTextFile(fullPath);

    return new VFile({
      value: fileContent,
      dirname: relPath,
      basename: fileName,
      cwd: basePath,
    });
  });

/** Options for the lint reporter. */
const lintReportOptions = {
  quiet: true,
} as const satisfies LintOptions;

/**
 * Lint files.
 *
 * @param files Markdown files.
 */
const lint = (files: VFile[]): Effect.Effect<void, string> =>
  Effect.gen(function* () {
    const lints = yield* Effect.sync(() => reporter(files, lintReportOptions));
    if (lints !== "") {
      yield* Effect.fail(lints);
    }
  });

/**
 * Compile MDX files into Preact JSX files.
 *
 * @param initialFiles A list of virtual MDX files for compilation.
 * @returns A list of virtual JS files.
 */
const compileSolutions = (
  initialFiles: Stream.Stream<VFile, Cause.UnknownException>,
): Stream.Stream<VFile, Cause.UnknownException> =>
  initialFiles.pipe(Stream.mapEffect(compileSolution));

/**
 * Plugins for the MDX compilation.
 */
const remarkPlugins = [
  remarkFrontmatter,
  remarkMdxFrontmatter,
  remarkPresetLintConsistent,
  remarkPresetLintRecommended,
  remarkLintCheckboxContentIndent,
  remarkLintDefinitionSpacing,
  remarkLintHeadingIncrement,
  remarkLintLinebreakStyle,
  remarkLintNoTabs,
  remarkLintNoConsecutiveBlankLines,
  remarkLintNoMissingBlankLines,
  [remarkMath, { singleDollarTextMath: false } satisfies MathOptions],
] as const satisfies PluggableList;

const rehypePlugins = [rehypeMathjax] as const satisfies PluggableList;

/** MDX compilation options. */
const compileOptions = {
  jsxImportSource: "preact",
  jsx: true,
  rehypePlugins,
  remarkPlugins,
} as const satisfies CompileOptions;

/**
 * Compile an MDX file into a Preact file.
 *
 * @param file A virtual MDX file.
 * @returns A virtual JS file.
 */
const compileSolution = (
  file: VFile,
): Effect.Effect<VFile, Cause.UnknownException> =>
  Effect.gen(function* () {
    yield* Effect.sync(() => matter(file)); // Extract the frontmatter into `data.matter`.

    const compiled = yield* Effect.tryPromise(() =>
      compile(file, compileOptions),
    );
    if (!compiled.data.matter) {
      return yield* Effect.dieMessage("");
    }

    compiled.extname = ".jsx";
    compiled.data = {
      ...compiled.data,
      matter: {
        ...compiled.data.matter,
        category:
          compiled.dirname && compiled.dirname !== "."
            ? compiled.dirname
            : compiled.stem ?? "",
      },
    };

    return compiled;
  });

const writeSolutions = (
  solutions: VFile[],
): Effect.Effect<void, Cause.UnknownException> =>
  Effect.all(
    solutions.map((solution) => writeSolution(solution)),
    { concurrency: "unbounded" },
  );

/**
 * Write the file to the disk.
 *
 * @param solution A file to write.
 * @returns A promise resolving when the file's written.
 */
const writeSolution = (
  solution: VFile,
): Effect.Effect<void, Cause.UnknownException, never> =>
  writeTextFile(join(contentDir, solution.path), solution.toString());

// Adjusting compareByCategory to use Order.Order<VFile>
const compareByCategory: Order.Order<VFile> = (a, b) => {
  const aCategory = a.data.matter?.category ?? "";
  const bCategory = b.data.matter?.category ?? "";
  const aCategoryIndex = categoryList.indexOf(aCategory);
  const bCategoryIndex = categoryList.indexOf(bCategory);
  return Order.number(
    aCategoryIndex === -1 ? Number.POSITIVE_INFINITY : aCategoryIndex,
    bCategoryIndex === -1 ? Number.POSITIVE_INFINITY : bCategoryIndex,
  );
};

const compareBySlug = Order.combine<VFile>(
  (a, b) => {
    const aSlugIndex = titleList.indexOf(a.stem ?? "");
    const bSlugIndex = titleList.indexOf(b.stem ?? "");

    // Compare indices if both slugs are found, otherwise return 0 to defer to the next orderer
    return aSlugIndex !== -1 && bSlugIndex !== -1
      ? Order.number(aSlugIndex, bSlugIndex)
      : 0;
  },
  Order.mapInput(Order.string, (file) => file.stem ?? ""),
);

// Main sorting function that uses category and slug comparisons.
const sortFiles = Order.combine(compareByCategory, compareBySlug);

/**
 * Write a file containing static imports for all the files.
 */
const staticImports = (
  files: VFile[],
): Effect.Effect<void, Cause.UnknownException> =>
  Effect.gen(function* () {
    const fileNames = files.map((file): string => file.path);
    const icons = files.flatMap((file) =>
      file.data.matter?.icon ? [file.data.matter.icon] : [],
    );
    const fileContent = staticImportsFile(fileNames, icons);
    yield* writeGenFile(fileContent, "imports");
  });

function createImport(url: string): string {
  return `(async () => await import("${url}"));`;
}

function createImports(
  imports: string[],
  transformer: (url: string) => string,
): string {
  return [
    ...new Set(imports.map((url) => createImport(transformer(url)))),
  ].join("\n");
}

/**
 * Create a file containing static imports for all the files.
 * An FE is an IIFE that is not immediately invoked.
 * More likely, an IIFE is actually an FE that *is* immediately invoked.
 * The mysteries of life...
 *
 * @param files The names of files.
 * @returns The contents of a Javascript file containing a bunch of FEs.
 */
function staticImportsFile(files: string[], icons: string[]): string {
  // TODO(lishaduck): Don't hardcode `"../content"`.
  const contentFiles = createImports(files, (file) => `../content/${file}`);
  const iconFiles = createImports(icons, (icon) => `$tabler_icons/${icon}.tsx`);

  return `${contentFiles}\n${iconFiles}\n`;
}

/**
 * Write a file containing the categories of all the files.
 */
const categories = (
  files: VFile[],
): Effect.Effect<void, Cause.UnknownException, never> =>
  Effect.gen(function* () {
    const fileContent = categoriesFile(files);

    yield* writeGenFile(fileContent, "categories");
  });

/**
 * Create a file containing the categories of all the files.
 */
function categoriesFile(files: VFile[]): string {
  const sortedFiles = files.map((file) => {
    const stem = file.stem ?? "";
    const category = file.data.matter?.category ?? "";

    return {
      slug: stem === category ? undefined : stem,
      data: {
        heroImage: `/images/${category}-${stem}.avif`,
        ...file.data.matter,
      },
    };
  });
  const parsedProfiles = solutionPagesSchema.parse(sortedFiles);
  const json = JSON.stringify(parsedProfiles, undefined, 2);

  return `import type { SolutionPages } from "./solutions.ts";

export const solutions = ${json} as const satisfies SolutionPages;
`;
}

/**
 * Write a file to the `utils` directory.
 */
const writeGenFile = (
  fileContent: string,
  fileName: string,
): Effect.Effect<void, Cause.UnknownException, never> =>
  writeTextFile(resolve(utilsDir, `${fileName}.gen.ts`), fileContent);

await Effect.runPromise(program);
