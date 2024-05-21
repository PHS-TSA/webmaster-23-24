import { Head, asset } from "$fresh/runtime.ts";
import type { Handlers, PageProps, RouteConfig } from "$fresh/server.ts";
import { join } from "@std/path";
import type { MDXModule } from "@vendor/mdx/types.ts";
import { clsx } from "clsx";
import type { JSX } from "preact";
import { Content } from "../../../components/Content.tsx";
import { Cover, type HeroProps } from "../../../components/Cover.tsx";
import { Meta } from "../../../components/Meta.tsx";
import { type Icon, IconSolarPanel } from "../../../components/icons.ts";
import { useCsp } from "../../../utils/csp.ts";
import type { FreshContextHelper } from "../../../utils/handlers.ts";

export const config = {
  csp: true,
} as const satisfies RouteConfig;

/**
 * Properties for the {@linkcode Solution} component.
 */
export interface SolutionProps {
  /**
   * The page to render.
   */
  readonly page: MDXModule;

  readonly slug: string;
  readonly category: string;
  readonly icon: Icon;
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
      if (category === undefined || category === "" || slug === undefined) {
        return await ctx.renderNotFound();
      }

      const extensionless = join(contentDir, category, slug);
      const filepath = `${extensionless}.js`;

      const file: MDXModule = await import(filepath);

      const icon: Icon = file.frontmatter.icon
        ? (await import(`$tabler_icons/${file.frontmatter.icon}.tsx`)).default
        : IconSolarPanel;

      return await ctx.render({ page: file, slug, category, icon });
    } catch (e) {
      console.error(e);

      return await ctx.renderNotFound();
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
  const heroImage = `/images/${data.category}-${data.slug}.avif`;

  return (
    <>
      <Head>
        <Meta title={pageTitle} description={description} />
      </Head>
      <main>
        <Cover
          title={pageTitle}
          Hero={ImageHero(heroImage)}
          icon={
            <data.icon
              class="size-52 text-yellow-200 dark:text-yellow-400"
              aria-hidden="true"
            />
          }
        >
          <p>{description}</p>
        </Cover>
        <Content>
          <data.page.default components={{ img: ContentImg }} />
        </Content>
      </main>
    </>
  );
}

function ImageHero(img: string): ({ children }: HeroProps) => JSX.Element {
  return ({ children }) => (
    <div class="flex flex-col px-4 py-2 sm:py-3 md:py-4 lg:py-8 h-[65svh] md:h-[75svh] lg:h-svh relative">
      <div class="hero">
        <img src={asset(img)} alt="" />
      </div>
      <div class="relative z-10 flex items-center justify-center">
        {children}
      </div>
    </div>
  );
}

function ContentImg(props: JSX.HTMLAttributes<HTMLImageElement>): JSX.Element {
  // biome-ignore lint/a11y/useAltText: It doesn't know that alt comes through the props spread.
  return (
    <img
      {...props}
      src={asset(
        typeof props.src === "string" ? props.src : props.src?.value ?? "",
      )}
      loading="lazy"
      class={clsx("rounded-sm", props.class)}
    />
  );
}
