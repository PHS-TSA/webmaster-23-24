import type { ComponentType } from "preact";
import { z } from "zod";

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

export const solutionPagesSchema = solutionPagesNullableSchema.transform(
  (
    val: z.infer<typeof solutionPagesNullableSchema>,
  ): readonly z.infer<typeof solutionPageSchema>[] =>
    val.filter(
      (
        val: z.infer<typeof solutionPageNullableSchema>,
      ): val is z.infer<typeof solutionPageSchema> => val !== undefined,
    ),
);

export interface MDXFile {
  readonly default: ComponentType<{ readonly [x: string]: unknown }>;
  readonly frontmatter: SolutionData;
}
