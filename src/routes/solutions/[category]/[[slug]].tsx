import { Head } from "$fresh/runtime.ts";
import type { Handlers, PageProps, RouteConfig } from "$fresh/server.ts";
import { join } from "@std/path";
import type { MDXModule } from "@vendor/mdx/types.ts";
import type { JSX } from "preact";
import { Content } from "../../../components/Content.tsx";
import { Cover } from "../../../components/Cover.tsx";
import { Meta } from "../../../components/Meta.tsx";
import { useCsp } from "../../../utils/csp.ts";
import type { FreshContextHelper } from "../../../utils/handlers.ts";
import { IconSolarPanel } from "../../../utils/icons.ts";

export const config = {
  csp: true,
} as const satisfies RouteConfig;

/**
 * Properties for the {@link Solution} component.
 */
export interface SolutionProps {
  /**
   * The page to render.
   */
  readonly page: MDXModule;
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
      if (category === undefined || category === "") {
        return await ctx.renderNotFound();
      }

      const base = join(contentDir, category);
      const extensionless = join(base, slug || "index");
      const filepath = `${extensionless}.js`;

      const file: MDXModule = await import(filepath);

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
  useCsp();

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
        <div
          class="progress fixed left-0 top-0 h-1 w-full rounded-ee-sm bg-green-500 dark:bg-green-700"
          aria-hidden="true"
        />
        <Content>
          <data.page.default components={{ img: ContentImg }} />
        </Content>
      </main>
    </>
  );
}

function ContentImg(props: JSX.HTMLAttributes<HTMLImageElement>): JSX.Element {
  // biome-ignore lint/a11y/useAltText: It doesn't know that alt comes through the props spread.
  return <img {...props} loading="lazy" class={`rounded-sm ${props.class}`} />;
}
