import { Head } from "$fresh/runtime.ts";
import type { Handlers, PageProps } from "$fresh/server.ts";
import type { JSX } from "preact";
import { Cover } from "../../components/Cover.tsx";
import { Meta } from "../../components/Meta.tsx";
import type { FreshContextHelper } from "../../utils/handlers.ts";
import { IconSolarPanel } from "../../utils/icons.ts";
import type { MDXFile } from "../../utils/solutions.ts";

export interface SolutionProps {
  readonly page: MDXFile;
}

export const handler: Handlers<SolutionProps> = {
  async GET(
    _req: Request,
    ctx: FreshContextHelper<SolutionProps>,
  ): Promise<Response> {
    try {
      const file: MDXFile = await import(
        `../../content/${ctx.params["slug"]}.js`
      );

      return ctx.render({ page: file });
    } catch {
      return ctx.renderNotFound();
    }
  },
};

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
