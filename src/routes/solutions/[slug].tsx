import { Head } from "$fresh/runtime.ts";
import type { Handlers, PageProps } from "$fresh/server.ts";
import { render } from "$gfm";
import type { JSX } from "preact";
import { Cover } from "../../components/Cover.tsx";
import { Meta } from "../../components/Meta.tsx";
import type { FreshContextHelper } from "../../utils/handlers.ts";
import { IconSolarPanel } from "../../utils/icons.ts";
import { type SolutionPage, solutions } from "../../utils/solutions.ts";

export interface SolutionProps {
  readonly page: SolutionPage;
}

export const handler: Handlers<SolutionProps> = {
  GET(
    _req: Request,
    ctx: FreshContextHelper<SolutionProps>,
  ): Response | Promise<Response> {
    const solution = solutions.find(
      (page: SolutionPage): boolean => page?.slug === ctx.params["slug"],
    );

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
          icon={
            <IconSolarPanel
              class="size-52 text-yellow-200 dark:text-yellow-400"
              aria-hidden="true"
            />
          }
        >
          <p class="my-4 dark:text-white">{description}</p>
        </Cover>
        <article
          class="p-10 prose prose-lg dark:prose-invert max-w-none prose-headings:flex prose-headings:flex-row prose-headings:items-center bg-slate-200 dark:bg-slate-800"
          // biome-ignore lint/security/noDangerouslySetInnerHtml: required for markdown w/out a custom renderer
          dangerouslySetInnerHTML={{
            // TODO(lishaduck): Write a custom Preact renderer to remove the need for dangerouslySetInnerHTML and allow fixing some CSS.
            __html: render(data.page.markdown ?? ""),
          }}
        />
      </main>
    </>
  );
}
