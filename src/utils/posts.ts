import { extract } from "$std/front_matter/yaml.ts";
import { join } from "$std/path/posix/join.ts";
import { z } from "zod";

export type SolutionPage = z.infer<typeof solutionPageSchema>;
export type SolutionData = z.infer<typeof solutionDataSchema>;
export type SolutionPages = z.infer<typeof solutionPagesFilteredSchema>;

const solutionDataSchema = z
  .object({
    title: z.string(),
    description: z.string(),
  })
  .passthrough();

const solutionPageSchema = z
  .object({
    slug: z.string(),
    markdown: z.string(),
    data: solutionDataSchema,
  })
  .strict()
  .readonly();

const solutionPagesSchema = z.array(solutionPageSchema.optional()).nonempty();

const solutionPagesFilteredSchema = solutionPagesSchema.transform((val) =>
  val.filter((val): val is SolutionPage => val !== null),
);

const solutionPagesPromiseSchema = z.promise(solutionPagesFilteredSchema);

const dir = "src/content";
export const solutions = await getSolutions();

/** Get all solutions. */
export async function getSolutions(): Promise<SolutionPages> {
  const files = Deno.readDir(dir);
  const promises = [];
  for await (const file of files) {
    const slug = file.name.replace(".md", "");
    promises.push(getSolution(slug));
  }

  return await solutionPagesPromiseSchema.parse(Promise.all(promises));
}

/** Get a solution. */
export async function getSolution(slug: string): Promise<SolutionPage | null> {
  try {
    const markdown = await Deno.readTextFile(join(dir, `${slug}.md`));
    const extracted = extract(markdown);
    const frontmatter = solutionDataSchema.parse(extracted.attrs);
    const solution = { frontmatter, body: extracted.body };

    return { markdown: solution.body, data: solution.frontmatter, slug };
  } catch (error) {
    console.error(error);
    return null;
  }
}
