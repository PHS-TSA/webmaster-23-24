import {
  dirname,
  fromFileUrl,
  join,
  relative,
  resolve,
} from "$std/path/mod.ts";
import { type CompileOptions, compile } from "@mdx-js/mdx";
import rehypeMathjax from "rehype-mathjax";
import remarkFrontmatter from "remark-frontmatter";
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
const srcDir = "../src" as const;
const contentDir = `${srcDir}/content` as const;
const utilsDir = `${srcDir}/utils` as const;

/**
 * Compile the MDX files into JS.
 */
async function run(): Promise<void> {
  const initialFiles = getSolutions(contentDir);
  const compiledFiles = compileSolutions(initialFiles);

  const promises = [];
  for await (const file of compiledFiles) {
    promises.push(file);
  }
  const files = await Promise.all(promises);
  files.sort(sortFiles);

  await Promise.all([
    Promise.resolve(lint(files)),
    writeSolutions(files),
    staticImports(files),
    categories(files),
  ]);

  console.info(`Compiled ${files.length} MDX files into JS.`);
}

/**
 * Get all of the MDX files in a directory.
 *
 * @param basePath - The path to hunt for MDX files to fetch.
 * @param currentPath - The current path to search for MDX files.
 *
 * @remarks
 * This is an async generator because it's recursive.
 */
// biome-ignore lint/nursery/useAwait: for-await isn't caught correctly.
async function* getSolutions(
  basePath: string,
  currentPath: string = basePath,
): AsyncGenerator<VFile, void, unknown> {
  for await (const entry of Deno.readDir(currentPath)) {
    const fullPath = join(currentPath, entry.name);
    const relPath = relative(basePath, currentPath);
    if (entry.isFile && entry.name.match(/mdx?/) !== null) {
      yield getSolution(fullPath, entry.name, relPath);
    } else if (entry.isDirectory) {
      yield* getSolutions(basePath, fullPath);
    }
  }
}

/**
 * Get the contents of a file.
 *
 * @param fullPath - The full path to the file.
 * @param fileName - The name of the file.
 * @param relPath - The relative path to the file.
 * @returns The file's contents.
 */
async function getSolution(
  fullPath: string,
  fileName: string,
  relPath = ".",
): Promise<VFile> {
  const fileContent = await Deno.readTextFile(fullPath);

  return new VFile({
    value: fileContent,
    dirname: relPath,
    basename: fileName,
  });
}

/** Options for the lint reporter. */
const lintReportOptions = {
  quiet: true,
} as const satisfies LintOptions;

/**
 * Lint files.
 *
 * @param files Markdown files.
 */
function lint(files: VFile[]): void {
  const lints = reporter(files, lintReportOptions);
  if (lints !== "") {
    console.error(lints);
  }
}

/**
 * Compile MDX files into Preact JSX files.
 *
 * @param initialFiles A list of virtual MDX files for compilation.
 * @returns A list of virtual JS files.
 */
// biome-ignore lint/nursery/useAwait: for-await isn't caught correctly.
async function* compileSolutions(
  initialFiles: AsyncIterable<VFile>,
): AsyncGenerator<VFile, void, unknown> {
  for await (const entry of initialFiles) {
    yield compileSolution(entry);
  }
}

/**
 * Plugins for the MDX compilation.
 */
const remarkPlugins = [
  remarkFrontmatter,
  // @ts-expect-error: Typescript dislikes current Deno deduping of Unified.
  remarkMdxFrontmatter,
  // @ts-expect-error: Typescript dislikes current Deno deduping of Unified.
  remarkPresetLintConsistent,
  // @ts-expect-error: Typescript dislikes current Deno deduping of Unified.
  remarkPresetLintRecommended,
  [remarkMath, { singleDollarTextMath: false } satisfies MathOptions],
] as const satisfies PluggableList;

const rehypePlugins = [rehypeMathjax] as const satisfies PluggableList;

/** MDX compilation options. */
const compileOptions = {
  jsxImportSource: "preact",
  rehypePlugins,
  // @ts-expect-error: Typescript dislikes current Deno deduping of Unified.
  remarkPlugins,
} as const satisfies CompileOptions;

/**
 * Compile an MDX file into a Preact file.
 *
 * @param file A virtual MDX file.
 * @returns A virtual JS file.
 */
async function compileSolution(file: VFile): Promise<VFile> {
  matter(file); // Extract the frontmatter into `data.matter`.

  // @ts-expect-error: Typescript dislikes current Deno deduping of Unified.
  const compiled = await compile(file, compileOptions);
  compiled.extname = ".js";

  // @ts-expect-error: Typescript dislikes current Deno deduping of Unified.
  compiled.data.matter.category =
    compiled.dirname !== "." ? compiled.dirname : compiled.stem;

  return compiled;
}

async function writeSolutions(solutions: VFile[]): Promise<void> {
  const promises = [];
  for (const solution of solutions) {
    promises.push(writeSolution(solution));
  }

  await Promise.all(promises);
}

/**
 * Write the file to the disk.
 *
 * @param solution A file to write.
 * @returns A promise resolving when the file's written.
 */
function writeSolution(solution: VFile): Promise<void> {
  return Deno.writeTextFile(
    join(contentDir, solution.path),
    solution.toString(),
  );
}

function sortFiles(a: VFile, b: VFile): number {
  const aCategory = a.data.matter?.category ?? "";
  const bCategory = b.data.matter?.category ?? "";
  const aSlug = a.stem ?? "";
  const bSlug = b.stem ?? "";

  const aCategoryIndex = categoryList.indexOf(aCategory);
  const bCategoryIndex = categoryList.indexOf(bCategory);
  const aSlugIndex = titleList.indexOf(aSlug);
  const bSlugIndex = titleList.indexOf(bSlug);

  // If the category is not found in the list, set the index to Infinity.
  const categoryComparison =
    (aCategoryIndex === -1 ? Number.POSITIVE_INFINITY : aCategoryIndex) -
    (bCategoryIndex === -1 ? Number.POSITIVE_INFINITY : bCategoryIndex);

  // If the slug is not found in the list, sort alphabetically.
  const slugComparison =
    aSlugIndex === -1 || bSlugIndex === -1
      ? aSlug.localeCompare(bSlug)
      : aSlugIndex - bSlugIndex;

  // If the categories are the same, sort by title, otherwise, sort by category.
  return categoryComparison === 0 ? slugComparison : categoryComparison;
}

/**
 * Write a file containing static imports for all the files.
 */
async function staticImports(files: VFile[]): Promise<void> {
  const fileNames = files.map((file): string => file.path);
  const fileContent = staticImportsFile(fileNames);
  await writeGenFile(fileContent, "imports");
}

/**
 * Create a file containing static imports for all the files.
 * An FE is an IIFE that isn't immediately invoked.
 * More likely, an IIFE is actually an FE that's immediately invoked.
 * The mysteries of life...
 *
 * @param files The names of files.
 * @returns The contents of a Javascript file containing a bunch of FEs.
 */
function staticImportsFile(files: string[]): string {
  return files
    .map((file) => `(async () => await import("../content/${file}"));`)
    .join("\n")
    .concat("\n");
}

/**
 * Write a file containing the categories of all the files.
 */
async function categories(files: VFile[]): Promise<void> {
  const fileContent = categoriesFile(files);
  await writeGenFile(fileContent, "categories");
}

/**
 * Create a file containing the categories of all the files.
 */
function categoriesFile(files: VFile[]): string {
  const sortedFiles = files.map((file) => {
    const stem = file.stem ?? "";
    const category = file.data.matter?.category ?? "";

    return {
      slug: stem === category ? undefined : stem,
      data: file.data.matter,
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
async function writeGenFile(
  fileContent: string,
  fileName: string,
): Promise<void> {
  await Deno.writeTextFile(
    resolve(utilsDir, `${fileName}.gen.ts`),
    fileContent,
  );
}

await run();
