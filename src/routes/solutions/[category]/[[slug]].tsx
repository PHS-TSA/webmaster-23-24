import { Head } from "$fresh/runtime.ts";
import type { Handlers, PageProps } from "$fresh/server.ts";
import type { JSX } from "preact";
import { Cover } from "../../../components/Cover.tsx";
import { Meta } from "../../../components/Meta.tsx";
import type { FreshContextHelper } from "../../../utils/handlers.ts";
import { IconSolarPanel } from "../../../utils/icons.ts";
import type { MDXFile } from "../../../utils/solutions.ts";
import { isKey } from "../../../utils/type-helpers.ts";

/**
 * Properties for the {@link Solution} component.
 */
export interface SolutionProps {
  /**
   * The page to render.
   */
  readonly page: MDXFile;
}

const contentDir = "../../../content";

/**
 * The server handler for the solution page.
 */
export const handler: Handlers<SolutionProps> = {
  async GET(
    _req: Request,
    ctx: FreshContextHelper<SolutionProps>,
  ): Promise<Response> {
    try {
      const isCategoryIndex = isKey(ctx.params, "slug");
      const filepath = !isCategoryIndex
        ? `${contentDir}/${ctx.params["category"]}.js`
        : `${contentDir}/${ctx.params["category"]}/${ctx.params["slug"]}.js`;

      const file: MDXFile = await import(filepath);

      return ctx.render({ page: file });
    } catch {
      return ctx.renderNotFound();
    }
  },
};

/**
 * Render a page for a green/clean energy solution.
 *
 * @param props - The component's properties.
 * @param props.data - The page data from the server handler.
 * @returns The rendered solution page.
 */
export default function Solution({
  data,
}: PageProps<SolutionProps>): JSX.Element {
  const pageTitle = data.page.frontmatter.title;
  const description = data.page.frontmatter.description;

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
        <article class="p-10 prose prose-lg dark:prose-invert max-w-none prose-headings:flex prose-headings:flex-row prose-headings:items-center bg-slate-200 dark:bg-slate-800">
          <data.page.default />
        </article>
      </main>
    </>
  );
}
