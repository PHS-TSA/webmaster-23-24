import { Head } from "$fresh/runtime.ts";
import type { Handlers, PageProps } from "$fresh/server.ts";
import { render } from "$gfm";
import IconSolarPanel from "$tabler_icons/solar-panel.tsx";
import type { JSX } from "preact";
import { Cover } from "../../components/Cover.tsx";
import { Meta } from "../../components/Meta.tsx";
import { type SolutionPage, solutions } from "../../utils/solutions.ts";

export interface SolutionProps {
  readonly page: SolutionPage;
}

export const handler: Handlers<SolutionProps> = {
  GET(_req, ctx): Response | Promise<Response> {
    const solution = solutions.find((page) => page.slug === ctx.params["slug"]);

    return solution === undefined
      ? ctx.renderNotFound()
      : ctx.render({ page: solution });
  },
};

export default function Solution({
  data,
}: PageProps<SolutionProps>): JSX.Element {
  const pageTitle = data.page.data.title;
  const description = data.page.data.description;

  return (
    <>
      <Head>
        <Meta title={pageTitle} description={description} />
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
          class="p-10 prose prose-lg dark:prose-invert max-w-none prose-headings:flex prose-headings:flex-row prose-headings:items-center bg-slate-200 dark:bg-slate-800"
          // biome-ignore lint/security/noDangerouslySetInnerHtml: required for markdown w/out a custom renderer
          dangerouslySetInnerHTML={{
            __html: render(data?.page.markdown ?? ""),
          }}
        />
      </main>
    </>
  );
}
