import { Head } from "$fresh/runtime.ts";
import type { Handlers, PageProps, RouteConfig } from "$fresh/server.ts";
import { IconBolt, IconLink } from "@tabler/icons-preact";
import { Schema } from "effect";
import type { ComponentType, JSX } from "preact";
import { Fragment } from "preact";
import { Carousel } from "../../../components/Carousel.tsx";
import { Content } from "../../../components/Content.tsx";
import { Cover, type HeroProps } from "../../../components/Cover.tsx";
import { Meta } from "../../../components/Meta.tsx";
import { solutions } from "../../../utils/categories.gen.ts";
import { useCsp } from "../../../utils/csp.ts";
import type { FreshContextHelper } from "../../../utils/handlers.ts";
import { hasSlug } from "../../../utils/type-helpers.ts";

export const config = {
  csp: true,
} as const satisfies RouteConfig;

export type CategoryProps = typeof CategoryProps.Type;
export type CategoryPages = typeof CategoryPropsPages.Type;
export type CategoryData = typeof CategoryPropsPageData.Type;

export const CategoryPropsPageData = Schema.Struct({
  short: Schema.String,
  linkText: Schema.String,
  title: Schema.String,
  linkTo: Schema.String,
  picture: Schema.String,
});

export const CategoryPropsPages = CategoryPropsPageData.pipe(Schema.Array);

export const CategoryProps = Schema.Struct({
  pages: CategoryPropsPages,
  title: Schema.String,
  description: Schema.String.pipe(
    Schema.filter((value) => !value.endsWith(".")),
  ),
  heros: Schema.String.pipe(Schema.Array),
});

/**
 * The server handler for the solution page.
 */
export const handler: Handlers<CategoryProps> = {
  async GET(
    _req: Request,
    ctx: FreshContextHelper<CategoryProps>,
  ): Promise<Response> {
    try {
      const { category } = ctx.params;
      if (
        category === undefined ||
        category === "" ||
        !Object.hasOwn(categoryMetadata, category)
      ) {
        return await ctx.renderNotFound();
      }

      let data: CategoryData[] = [];
      for (const solution of solutions) {
        if (hasSlug(solution)) {
          const { data: solutionData } = solution;

          if (solutionData.category === category) {
            data = [
              ...data,
              {
                short: solutionData.description,
                linkText: solutionData.title,
                title: solutionData.sectionHeader,
                linkTo: solution.slug,
                picture: solution.data.heroImage,
              },
            ];
          }
        }
      }

      const metadata =
        categoryMetadata[
          // See microsoft/TypeScript#44253
          category as keyof typeof categoryMetadata
        ];

      return await ctx.render({
        pages: Schema.decodeSync(CategoryPropsPages)(data),
        title: metadata.title,
        description: metadata.description,
        heros: data.map((page) => page.picture),
      });
    } catch (e) {
      console.error(e);

      return await ctx.renderNotFound();
    }
  },
};

const categoryMetadata = {
  solar: {
    title: "Solar Energy",
    description: "Solar Energy is an undertapped energy resource",
  },
  geothermal: {
    title: "Geothermal Energy",
    description: "Geothermal Energy is an undertapped energy resource",
  },
  recycling: {
    title: "Recycling",
    description: "Recycling saves energy and reduces pollution",
  },
  other: {
    title: "Other Initiatives",
    description:
      "There are many other best practices and ongoing clean and green energy initiatives",
  },
};

/**
 * Render a page for a green/clean energy solution.
 *
 * @param props - The component's properties.
 * @param props.data - The page data from the server handler.
 * @returns The rendered solution page.
 */
export default function Category({
  data,
}: PageProps<CategoryProps>): JSX.Element {
  useCsp();

  const { title: pageTitle, description, pages, heros } = data;

  return (
    <>
      <Head>
        <Meta title={pageTitle} description={description} />
      </Head>
      <main>
        <Cover
          title={pageTitle}
          Hero={CategoryCarousel(heros)}
          icon={
            <IconBolt
              class="size-52 text-yellow-200 dark:text-yellow-400"
              aria-hidden="true"
            />
          }
        >
          <p>{description}</p>
        </Cover>
        <Content>
          {pages.map(
            ({ linkText, short, title, linkTo }: CategoryData): JSX.Element => {
              const slug = title.toLowerCase().replace(/[^\w]+/g, "-");

              return (
                <Fragment key={linkTo}>
                  <h2 class="relative" id={slug}>
                    {/* biome-ignore lint/a11y/useAnchorContent: Biome doesn't support aria-label. */}
                    <a
                      class="absolute -left-8 hover:text-slate-600 dark:hover:text-slate-400"
                      key="anchorLink"
                      href={`#${slug}`}
                      aria-hidden
                      aria-label="Anchor Link"
                      tabindex={-1}
                    >
                      <IconLink />
                    </a>
                    {title}
                  </h2>
                  <p>
                    {short}.
                    <br />
                    For more information, see <a href={linkTo}>{linkText}</a>.
                  </p>
                </Fragment>
              );
            },
          )}
        </Content>
      </main>
    </>
  );
}

function CategoryCarousel(heros: readonly string[]): ComponentType<HeroProps> {
  return ({ children }) => <Carousel heros={heros}>{children}</Carousel>;
}
