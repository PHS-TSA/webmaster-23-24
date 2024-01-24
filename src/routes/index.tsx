import { Head } from "$fresh/runtime.ts";
import type { JSX } from "preact";
import { Cover } from "../components/Cover.tsx";
import { Meta } from "../components/Meta.tsx";
import { siteName } from "../site.ts";

/**
 * The page title.
 */
const pageTitle = "Home";

/**
 * Render the home page.
 *
 * @returns The rendered home page.
 */
export default function Home(): JSX.Element {
  return (
    <>
      <Head>
        <Meta title={pageTitle} />
      </Head>
      <Cover title={siteName}>
        <p class="my-4 dark:text-white">
          Looking for information about solar power? You've come to the right
          place!
        </p>
      </Cover>
    </>
  );
}
