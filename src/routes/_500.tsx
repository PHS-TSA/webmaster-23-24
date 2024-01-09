import { Head } from "$fresh/runtime.ts";
import type { VNode } from "preact";
import { Cover } from "../components/Cover.tsx";
import { Meta } from "../components/Meta.tsx";

const pageTitle = "500 — Internal Server Error";

export default function Error500(): VNode {
  return (
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
}
