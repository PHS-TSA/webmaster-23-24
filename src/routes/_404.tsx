import { Head } from "$fresh/runtime.ts";
import type { JSX } from "preact";
import { Cover } from "../components/Cover.tsx";
import { Meta } from "../components/Meta.tsx";

/**
 * The page title.
 */
const pageTitle = "404 — Page not found" as const;

/**
 * Render a 404 page.
 * HTTP 404 pages are shown when a page doesn't exist.
 *
 * @returns The rendered 404 page.
 */
export default function Error404(): JSX.Element {
  return (
    <>
      <Head>
        <Meta title={pageTitle} />
      </Head>
      <Cover title={pageTitle}>
        <p>The page you were looking for doesn't exist.</p>
        <a href="/" class="underline">
          Go back home
        </a>
      </Cover>
    </>
  );
}
