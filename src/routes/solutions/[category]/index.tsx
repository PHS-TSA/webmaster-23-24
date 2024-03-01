import { Head } from "$fresh/runtime.ts";
import type { Handlers, PageProps } from "$fresh/server.ts";
import type { JSX } from "preact";
import { z } from "zod";
import { Cover } from "../../../components/Cover.tsx";
import { Meta } from "../../../components/Meta.tsx";
import { solutions } from "../../../utils/categories.gen.ts";
import type { FreshContextHelper } from "../../../utils/handlers.ts";
import { IconSolarPanel } from "../../../utils/icons.ts";
import { kebabToCamel } from "../../../utils/strings.ts";
import { hasSlug, isKey, isSlug } from "../../../utils/type-helpers.ts";

export type CategoryProps = z.infer<typeof categoryProps>;
export type CategoryPages = z.infer<typeof categoryPropsPages>;
export type CategoryData = z.infer<typeof categoryPropsPageData>;

const categoryPropsPageData = z.object({
  short: z.string(),
  linkText: z.string(),
});

const categoryPropsPages = z.object({
  what: categoryPropsPageData,
  environment: categoryPropsPageData,
  cost: categoryPropsPageData,
  worthIt: categoryPropsPageData,
});

const categoryProps = z.object({
  page: categoryPropsPages,
  title: z.string(),
  description: z.string(),
});

/**
 * The server handler for the solution page.
 */
export const handler: Handlers<CategoryProps> = {
  GET(
    _req: Request,
    ctx: FreshContextHelper<CategoryProps>,
  ): Response | Promise<Response> {
    try {
      const { category } = ctx.params;
      if (category === undefined || !isKey(categoryMetadata, category)) {
        return ctx.renderNotFound();
      }

      let data: Partial<CategoryPages> = {};
      for (const solution of solutions) {
        if (hasSlug(solution)) {
          const { slug, data: solutionData } = solution;
          const camelSlug = kebabToCamel(slug);

          if (solutionData.category === category && isSlug(camelSlug)) {
            data = {
              ...data,
              [camelSlug]: {
                ...data[camelSlug],
                short: solutionData.description,
                linkText: solutionData.title,
              },
            };
          }
        }
      }

      const parsedData = categoryPropsPages.safeParse(data);

      if (parsedData.success) {
        return ctx.render({
          page: parsedData.data,
          title: categoryMetadata[category].title,
          description: categoryMetadata[category].description,
        });
      }

      console.error(parsedData.error);
      return ctx.renderNotFound();
    } catch (e) {
      console.error(e);
      return ctx.renderNotFound();
    }
  },
};

const categoryMetadata = {
  solar: {
    title: "Solar Energy",
    description: "Solar Energy is an undertapped energy resource",
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
  const {
    title: pageTitle,
    description,
    page: {
      what: { short: whatShort, linkText: whatLinkText },
      environment: { short: environmentShort, linkText: environmentLinkText },
      cost: { short: costShort, linkText: costLinkText },
      worthIt: { short: worthItShort, linkText: worthItLinkText },
    },
  } = data;

  return (
    <>
      <Head>
        <Meta title={pageTitle} description={description} />
      </Head>
      <main>
        <Cover
          title={pageTitle}
          icon={
            <IconSolarPanel
              class="size-52 text-yellow-200 dark:text-yellow-400"
              aria-hidden="true"
            />
          }
        >
          <p class="my-4 dark:text-white">{description}</p>
        </Cover>
        <article class="py-10 px-40 prose prose-lg dark:prose-invert max-w-none prose-headings:flex prose-headings:flex-row prose-headings:items-center bg-slate-200 dark:bg-slate-800">
          <h2>What is it?</h2>
          <p>
            {whatShort}.
            <br />
            For more information, see <a href="./what/">{whatLinkText}</a>.
          </p>
          <h2>How does it impact the environment?</h2>
          <p>
            {environmentShort}.
            <br />
            For more information, see{" "}
            <a href="./environment/">{environmentLinkText}</a>.
          </p>
          <h2>Cost</h2>
          <p>
            {costShort}.
            <br />
            For more information, see <a href="./cost/">{costLinkText}</a>.
          </p>

          <h2>Is it worth it?</h2>
          <p>
            {worthItShort}.
            <br />
            For more information, see{" "}
            <a href="./worth-it/">{worthItLinkText}</a>.
          </p>
        </article>
      </main>
    </>
  );
}
