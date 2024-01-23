import { dirname, fromFileUrl, resolve } from "$std/path/mod.ts";
import { type CompileOptions, compile } from "@mdx-js/mdx";
import remarkFrontmatter from "remark-frontmatter";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";
import remarkPresetLintConsistent from "remark-preset-lint-consistent";
import remarkPresetLintRecommended from "remark-preset-lint-recommended";
import { VFile } from "vfile";
import { matter } from "vfile-matter";
import { reporter } from "vfile-reporter";
import { map } from "./promises.ts";

// Change the directory so that relative paths are based on the file, not the CWD.
Deno.chdir(dirname(fromFileUrl(Deno.mainModule)));

// Directories for resolve.
const srcDir = "../src";
const contentDir = `${srcDir}/content`;
const utilsDir = `${srcDir}/utils`;

async function run(): Promise<void> {
  const initialFiles = await map(
    Deno.readDir(contentDir),
    (entry) => getSolution(entry.name),
    (entry) => entry.isFile && entry.name.match(/mdx?/) !== null,
  );
  const files = await map(initialFiles, compileSolution);

  await Promise.all([
    new Promise<void>((resolve) => resolve(lint(files))),
    map(files, writeSolution),
    staticImports(files),
  ]);

  console.info(`Compiled ${files.length} MDX files into JS.`);
}

async function getSolution(fileName: string): Promise<VFile> {
  // Get the file.
  const fileContent = await Deno.readTextFile(resolve(contentDir, fileName));

  // Convert the file to Unified format.
  return new VFile({
    value: fileContent,
    basename: fileName,
  });
}

/** Options for the lint reporter. */
const lintReportOptions = {
  quiet: true,
};

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

const remarkPlugins = [
  remarkFrontmatter,
  remarkMdxFrontmatter,
  remarkPresetLintConsistent,
  remarkPresetLintRecommended,
];

/** MDX compilation options. */
const compileOptions: CompileOptions = {
  jsxImportSource: "preact",
  // @ts-expect-error: Unified's types dislike current Deno deduping.
  remarkPlugins,
};

/**
 * Compile the MDX into Preact JSX.
 *
 * @param file MDX.
 * @returns Preact.
 */
async function compileSolution(file: VFile): Promise<VFile> {
  matter(file); // Extract the frontmatter into `data.matter`.

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
    resolve(contentDir, solution.basename ?? ""),
    solution.toString(),
  );
}

async function staticImports(files: VFile[]): Promise<void> {
  const fileNames = files.map((file): string => file.basename ?? "");
  const fileContent = staticImportsFile(fileNames);
  await writeStaticImports(fileContent);
}

/**
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

async function writeStaticImports(feFile: string): Promise<void> {
  await Deno.writeTextFile(resolve(utilsDir, "imports.gen.ts"), feFile);
}

await run();
