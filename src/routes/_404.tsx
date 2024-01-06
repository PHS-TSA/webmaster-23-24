import { Head } from "$fresh/runtime.ts";
import type { PageProps } from "$fresh/server.ts";
import type { FunctionalComponent } from "preact";
import Cover from "../components/Cover.tsx";
import Meta from "../components/Meta.tsx";

const pageTitle = "404 — Page not found";

const Error404: FunctionalComponent<PageProps> = () => (
  <>
    <Head>
      <Meta title={pageTitle} />
    </Head>
    <Cover title={pageTitle}>
      <>
        <p class="my-4 dark:text-white">
          The page you were looking for doesn't exist.
        </p>
        <a href="/" class="underline">
          Go back home
        </a>
      </>
    </Cover>
  </>
);

export { Error404 as default };
