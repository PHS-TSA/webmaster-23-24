import {
  dirname,
  fromFileUrl,
  join,
  relative,
  resolve,
} from "$std/path/mod.ts";
import { type CompileOptions, compile } from "@mdx-js/mdx";
import remarkFrontmatter from "remark-frontmatter";
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
} from "../src/utils/solutions.ts";

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

  lint(files);
  await Promise.all([
    ...files.map(writeSolution),
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
  // @ts-expect-error: remark-lint it still on Unified 10, but it works fine with Unified 11.
  remarkPresetLintConsistent,
  // @ts-expect-error: remark-lint it still on Unified 10, but it works fine with Unified 11.
  remarkPresetLintRecommended,
] as const satisfies PluggableList;

/** MDX compilation options. */
const compileOptions = {
  jsxImportSource: "preact",
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

  return compiled;
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

declare module "vfile" {
  export interface DataMap {
    /**
     * The frontmatter of the file.
     */
    readonly matter: SolutionData;
  }
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
  const sortedFiles = files
    .toSorted(
      (a, b) =>
        categoryList.indexOf(a.data["matter"]?.category ?? categoryList[0]) -
        categoryList.indexOf(b.data["matter"]?.category ?? categoryList[0]),
    )
    .map((file) => {
      return { slug: file.stem ?? "", data: file.data["matter"] };
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
