import { dirname, fromFileUrl } from "$std/path/mod.ts";
import { resolve } from "$std/path/resolve.ts";
import { type CompileOptions, compile } from "@mdx-js/mdx";

// Change the directory so that relative paths are based on the file, not the CWD.
Deno.chdir(dirname(fromFileUrl(Deno.mainModule)));

// Directories for resolve.
const srcDir = "../src";
const contentDir = `${srcDir}/content`;
const utilsDir = `${srcDir}/utils`;

async function run(): Promise<void> {
  const fileNames = await getSolutions();
  await staticImports(fileNames);
  console.info(`Compiled ${fileNames.length} MDX files into JS.`);
}

await run();

async function getSolutions(): Promise<string[]> {
  const promises: Promise<string>[] = [];

  for await (const entry of Deno.readDir(contentDir)) {
    if (entry.isFile && entry.name.match(/mdx?/)) {
      promises.push(getSolution(entry));
    }
  }

  return await Promise.all(promises);
}

async function getSolution(entry: Deno.DirEntry): Promise<string> {
  // Get the file.
  const mdx: string = await Deno.readTextFile(resolve(contentDir, entry.name));

  // Set MDX compilation options.
  const compileOptions: CompileOptions = {
    jsxImportSource: "preact",
  };

  // Compile the MDX into Preact JSX.
  const compiled = await compile(mdx, compileOptions);

  const slug = entry.name.replace(/\.[^\.]*$/, "");
  const fileName = `${slug}.js`;

  // Write the file to the disk.
  await Deno.writeTextFile(resolve(contentDir, fileName), compiled.toString());

  return fileName;
}

async function staticImports(files: string[]): Promise<void> {
  const iifeFile = files
    .map((file) => `async () => await import("../content/${file}");`)
    .join("\n");

  await Deno.writeTextFile(resolve(utilsDir, "imports.ts"), iifeFile);
}
