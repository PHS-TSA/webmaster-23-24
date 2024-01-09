import { Head } from "$fresh/runtime.ts";
import type { Handlers, PageProps } from "$fresh/server.ts";
import { render } from "$gfm";
import IconSolarPanel from "$tabler_icons/solar-panel.tsx";
import type { VNode } from "preact";
import { Cover } from "../../components/Cover.tsx";
import { Meta } from "../../components/Meta.tsx";
import { type SolutionPage, solutions } from "../../utils/posts.ts";

export interface SolutionProps {
  readonly page: SolutionPage;
}

export const handler: Handlers<SolutionProps> = {
  GET(_req, ctx): Response | Promise<Response> {
    const solution = solutions.find(({ slug }) => slug === ctx.params["slug"]);

    if (solution === undefined) {
      return ctx.renderNotFound();
    }

    return ctx.render({ page: solution });
  },
};

export default function Solution({ data }: PageProps): VNode {
  const _pageTitle = data.page.data["title"];
  const pageTitle = typeof _pageTitle === "string" ? _pageTitle : "";
  const _description = data.page.data["description"];
  const description = typeof _description === "string" ? _description : "";

  return (
    <>
      <Head>
        <Meta title={pageTitle} />
      </Head>
      <main>
        <Cover
          title={pageTitle}
          icon={() => (
            <IconSolarPanel
              class="size-52 text-yellow-200 dark:text-yellow-400"
              aria-hidden="true"
            />
          )}
        >
          <p class="my-4 dark:text-white">{description}</p>
        </Cover>
        <article
          class="p-10 prose prose-lg dark:prose-invert max-w-none prose-headings:flex prose-headings:flex-row prose-headings:items-center bg-slate-200"
          // biome-ignore lint/security/noDangerouslySetInnerHtml: required for markdown w/out a custom renderer
          dangerouslySetInnerHTML={{
            __html: render(data?.page.markdown ?? ""),
          }}
        />
      </main>
    </>
  );
}
