import type { ComponentType } from "preact";
import { z } from "zod";

/**
 * The metadata for a solution.
 */
export type SolutionData = z.infer<typeof solutionDataSchema>;

/**
 * The set of solution pages with their metadata.
 */
export type SolutionPages = z.infer<typeof solutionPagesSchema>;

const solutionDataSchemaDescription = "Metadata for the solution.";

/**
 * Represent the data for the solution pages.
 */
const solutionDataSchema = z
  .object({
    title: z.string().describe("The title of the solution."),
    description: z.string().describe("The description of the solution."),
    category: z.string().describe("The category of the solution."),
  })
  .passthrough()
  .readonly()
  .describe(solutionDataSchemaDescription);

/**
 * Represent a set of solution pages.
 */
const solutionPageSchema = z
  .object({
    slug: z
      .string()
      .describe("The slug of the solution without a trailing slash."),
    data: solutionDataSchema.describe(solutionDataSchemaDescription),
  })
  .strict()
  .readonly()
  .describe("A solution page.");

/**
 * Represent a set of possible solution pages.
 * @internal
 *
 * @remarks
 *
 * Just for typechecking.
 */
const solutionPageNullableSchema = solutionPageSchema.optional();

/**
 * Represent a set of possible solution pages.
 */
const solutionPagesNullableSchema = solutionPageNullableSchema
  .array()
  .readonly();

/**
 * Represent the data for the solution pages.
 * @internal
 *
 * @remarks
 *
 * ONLY FOR USE IN CODEGEN!!!
 *
 * This is used to verify that the MDX frontmatter is correct when the category code is generated.
 * This also generates types so that TypeScript can typecheck solutions at compile time.
 */
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

/**
 * A compiled file of Markdown XML which contains metadata in the form of frontmatter.
 */
export interface MDXFile {
  /**
   * The default export of the MDX file, which is a preact component.
   */
  readonly default: ComponentType<{ readonly [x: string]: unknown }>;

  /**
   * The frontmatter of the MDX file.
   */
  readonly frontmatter: SolutionData;
}
