import { Head } from "$fresh/runtime.ts";
import type { Handlers, PageProps, RouteConfig } from "$fresh/server.ts";
import type { JSX } from "preact";
import { Fragment } from "preact";
import { z } from "zod";
import { Content } from "../../../components/Content.tsx";
import { Cover } from "../../../components/Cover.tsx";
import { Meta } from "../../../components/Meta.tsx";
import { solutions } from "../../../utils/categories.gen.ts";
import { useCsp } from "../../../utils/csp.ts";
import type { FreshContextHelper } from "../../../utils/handlers.ts";
import { IconBolt, IconLink } from "../../../utils/icons.ts";
import { hasSlug, isKey } from "../../../utils/type-helpers.ts";

export const config = {
  csp: true,
} as const satisfies RouteConfig;

export type CategoryProps = z.infer<typeof categoryProps>;
export type CategoryPages = z.infer<typeof categoryPropsPages>;
export type CategoryData = z.infer<typeof categoryPropsPageData>;

const categoryPropsPageData = z.object({
  short: z.string(),
  linkText: z.string(),
  title: z.string(),
  linkTo: z.string(),
});

const categoryPropsPages = categoryPropsPageData.array();

const categoryProps = z.object({
  pages: categoryPropsPages,
  title: z.string(),
  description: z.string().refine((value) => !value.endsWith(".")),
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
        !isKey(categoryMetadata, category)
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
              },
            ];
          }
        }
      }

      return await ctx.render({
        pages: categoryPropsPages.parse(data),
        title: categoryMetadata[category].title,
        description: categoryMetadata[category].description,
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

  const { title: pageTitle, description, pages } = data;

  return (
    <>
      <Head>
        <Meta title={pageTitle} description={description} />
      </Head>
      <main>
        <Cover
          title={pageTitle}
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
