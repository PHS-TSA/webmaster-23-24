import { Schema } from "@effect/schema";
import { icons } from "@tabler/icons-preact";

/**
 * The metadata for a solution.
 */
export type SolutionData = typeof SolutionDataSchema.Type;

/**
 * The set of solution pages with their metadata.
 */
export type SolutionPages = typeof SolutionPagesSchema.Type;

export type SolutionPage = typeof SolutionPageSchema.Type;

/**
 * A list of categories, in order.
 */
export const categoryList = ["solar", "geothermal", "recycling", "other"];

export const titleList = ["what", "environment", "cost", "worth-it"];

/**
 * Represent the data for the solution pages.
 */
export const SolutionDataSchema = Schema.Struct({
  title: Schema.String.annotations({
    description: "The title of the solution.",
  }),
  description: Schema.String.pipe(
    Schema.filter((value) => !value.endsWith(".")),
  ).annotations({
    description: "The description of the solution.",
  }),
  category: Schema.String.annotations({
    description: "The category of the solution.",
  }),
  sectionHeader: Schema.String.annotations({
    description: "The section header for the category index page.",
  }),
  heroImage: Schema.String.pipe(
    Schema.filter((value) => avifImageRegex.test(value)),
  ).annotations({
    description: "The image to use for the hero.",
  }),
  icon: Schema.String.pipe(
    Schema.filter((value) => Object.hasOwn(icons, value)),
  ).annotations({
    description: "The Tabler icon to use for the solution.",
  }),
}).annotations({
  description: "Metadata for the solution.",
  parseOptions: {
    onExcessProperty: "preserve",
  },
});

const avifImageRegex = /images\/.+.avif$/;

/**
 * Represent a set of solution pages.
 */
export const SolutionPageSchema = Schema.Struct({
  slug: Schema.String.pipe(Schema.optional).annotations({
    description: "The slug of the solution without a trailing slash.",
  }),
  data: SolutionDataSchema,
}).annotations({
  description: "A solution page.",
  parseOptions: {
    onExcessProperty: "error",
  },
});

/**
 * Represent a set of possible solution pages.
 * @internal
 *
 * @remarks
 *
 * Just for typechecking.
 */
const SolutionPageNullableSchema = SolutionPageSchema.pipe(Schema.partial);

/**
 * Represent a set of possible solution pages.
 */
const SolutionPagesNullableSchema = SolutionPageNullableSchema.pipe(
  Schema.Array,
);

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
export const SolutionPagesSchema = Schema.transform(
  SolutionPagesNullableSchema,
  Schema.typeSchema(SolutionPageSchema).pipe(Schema.Array),
  {
    strict: true,
    decode: (val) => val.filter((val) => Schema.is(SolutionPageSchema)(val)),
    encode: (val) => val.filter((val) => val.data !== undefined),
  },
);
