import type { Extract } from "$std/front_matter/create_extractor.ts";
import { extract } from "$std/front_matter/yaml.ts";
import { join } from "$std/path/posix/join.ts";

export interface SolutionPage {
  readonly slug: string;
  readonly markdown: string;
  readonly data: SolutionData;
}

export type SolutionData = Record<string, unknown>; // TODO: validate w/Zod.

const dir = "src/content";

export const solutions = await getPosts();

/** Get all solutions. */
export async function getPosts(): Promise<readonly SolutionPage[]> {
  const files = Deno.readDir(dir);
  const promises = [];
  for await (const file of files) {
    const slug = file.name.replace(".md", "");
    promises.push(getPost(slug));
  }

  const solutions = await Promise.all(promises);

  return solutions.filter((val): val is SolutionPage => val !== null);
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
