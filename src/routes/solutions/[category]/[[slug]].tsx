import { Head } from "$fresh/runtime.ts";
import type { Handlers, PageProps } from "$fresh/server.ts";
import { join } from "$std/path/mod.ts";
import type { JSX } from "preact";
import { Content } from "../../../components/Content.tsx";
import { Cover } from "../../../components/Cover.tsx";
import { Meta } from "../../../components/Meta.tsx";
import type { FreshContextHelper } from "../../../utils/handlers.ts";
import { IconSolarPanel } from "../../../utils/icons.ts";
import type { MdxFile } from "../../../utils/solutions.ts";

/**
 * Properties for the {@link Solution} component.
 */
export interface SolutionProps {
  /**
   * The page to render.
   */
  readonly page: MdxFile;
}

const contentDir = "../../../content" as const;

/**
 * The server handler for the solution page.
 */
export const handler: Handlers<SolutionProps> = {
  async GET(
    _req: Request,
    ctx: FreshContextHelper<SolutionProps>,
  ): Promise<Response> {
    try {
      const { category, slug } = ctx.params;
      if (category === undefined) {
        return await ctx.renderNotFound();
      }

      const base = join(contentDir, category);
      const extensionless = join(base, slug || "index");
      const filepath = `${extensionless}.js`;

      const file: MdxFile = await import(filepath);

      return await ctx.render({ page: file });
    } catch (e) {
      console.error(e);

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
  const { title: pageTitle, description } = data.page.frontmatter;

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
          <p>{description}</p>
        </Cover>
        <Content>
          <data.page.default />
        </Content>
      </main>
    </>
  );
}
