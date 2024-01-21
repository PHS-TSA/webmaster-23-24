import type { ComponentType } from "preact";
import { z } from "zod";

export type SolutionPage = z.infer<typeof solutionPageSchema>;
export type SolutionData = z.infer<typeof solutionDataSchema>;
export type SolutionPages = z.infer<typeof solutionPagesSchema>;

const solutionDataSchema = z
  .object({
    title: z.string(),
    description: z.string(),
    category: z.string(),
  })
  .passthrough()
  .readonly();

const solutionPageSchema = z
  .object({
    slug: z.string(), // The slug of the solution without a trailing slash.
    data: solutionDataSchema,
  })
  .strict()
  .readonly();

const solutionPageNullableSchema = solutionPageSchema.optional();

const solutionPagesNullableSchema = solutionPageNullableSchema
  .array()
  .readonly();

const solutionPagesSchema = solutionPagesNullableSchema.transform(
  (val: z.infer<typeof solutionPagesNullableSchema>): readonly SolutionPage[] =>
    val.filter(
      (val: z.infer<typeof solutionPageNullableSchema>): val is SolutionPage =>
        val !== undefined,
    ),
);

export interface MDXFile extends SolutionData {
  readonly default: ComponentType<{ readonly [x: string]: unknown }>;
}

const dir = "src/content";
const categorySort = ["green", "monies", "solar"];

export const solutions = await getSolutions();

/** Get all solutions. */
export async function getSolutions(): Promise<SolutionPages> {
  const promises = [];
  for await (const entry of Deno.readDir(dir)) {
    if (entry.isFile && entry.name.match(/mdx?/)) {
      promises.push(getSolution(entry.name.replace(/\.[^\.]*$/, "")));
    }
  }

  const unparsedSolutions = await Promise.all(promises);
  const solutions = solutionPagesSchema.parse(unparsedSolutions);

  return solutions.toSorted(
    (a, b) =>
      categorySort.indexOf(a.data.category) -
      categorySort.indexOf(b.data.category),
  );
}

/** Get a solution. */
export async function getSolution(
  slug: string,
): Promise<SolutionPage | undefined> {
  try {
    const file: MDXFile = await import(`../content/${slug}.js`);

    return { data: file, slug };
  } catch (error) {
    console.error(error);
    return undefined;
  }
}
