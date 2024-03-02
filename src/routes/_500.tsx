import { Head } from "$fresh/runtime.ts";
import type { JSX } from "preact";
import { Cover } from "../components/Cover.tsx";
import { Meta } from "../components/Meta.tsx";

/**
 * The page title.
 */
const pageTitle = "500 — Internal Server Error" as const;

/**
 * Render a 500 page.
 * HTTP 500 pages are shown when an internal server error occurs.
 *
 * @returns The rendered 500 page.
 */
export default function Error500(): JSX.Element {
  return (
    <>
      <Head>
        <Meta title={pageTitle} />
      </Head>
      <Cover title={pageTitle}>
        <>
          <p class="dark:text-white">An internal server error occurred.</p>
          <a href="/" class="underline">
            Go back home
          </a>
        </>
      </Cover>
    </>
  );
}
