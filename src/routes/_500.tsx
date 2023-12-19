import { Head } from "$fresh/runtime.ts";
import type { PageProps } from "$fresh/server.ts";
import type { FunctionalComponent } from "preact";
import Cover from "../components/Cover.tsx";
import Meta from "../components/Meta.tsx";

const pageTitle = "500 — Internal Server Error";

const Error500: FunctionalComponent<PageProps> = () => (
  <>
    <Head>
      <Meta title={pageTitle} />
    </Head>
    <Cover title={pageTitle}>
      <>
        <p class="my-4 dark:text-white">An internal server error occurred.</p>
        <a href="/" class="underline">
          Go back home
        </a>
      </>
    </Cover>
  </>
);

export { Error500 as default };
