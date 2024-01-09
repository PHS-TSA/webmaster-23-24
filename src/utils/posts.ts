import type { Extract } from "$std/front_matter/create_extractor.ts";
import { extract } from "$std/front_matter/yaml.ts";
import { join } from "$std/path/posix/join.ts";

interface SolutionPage {
  slug: string;
  markdown: string;
  data: Record<string, unknown>;
}

const dir = "src/content";

const solutions = await getPosts();

/** Get all solutions. */
export async function getPosts(): Promise<SolutionPage[]> {
  const files = Deno.readDir(dir);
  const promises = [];
  for await (const file of files) {
    const slug = file.name.replace(".md", "");
    promises.push(getPost(slug));
  }

  const solutions = await Promise.all(promises); // TODO: validate w/Zod.

  return solutions as SolutionPage[];
}

/** Get a solution. */
export async function getPost(slug: string): Promise<SolutionPage | null> {
  let extracted: Extract<Record<string, unknown>>;
  try {
    const markdown = await Deno.readTextFile(join(dir, `${slug}.md`));
    extracted = extract(markdown);
  } catch (_) {
    return null;
  }
  return { markdown: extracted.body, data: extracted.attrs, slug };
}

export { solutions, type SolutionPage };
