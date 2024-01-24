import { Head } from "$fresh/runtime.ts";
import type { JSX } from "preact";
import { Cover } from "../components/Cover.tsx";
import { Meta } from "../components/Meta.tsx";

/**
 * The page title.
 */
const pageTitle = "About";

/**
 * Render an about page.
 *
 * @returns The rendered about page.
 */
export default function About(): JSX.Element {
  return (
    <>
      <Head>
        <Meta title={pageTitle} />
      </Head>
      <Cover title={pageTitle}>
        <p class="my-4 dark:text-white">It's us, man!</p>
        {/* Add link to the portfolio PDF. */}
      </Cover>
    </>
  );
}
