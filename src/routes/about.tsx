import { Head } from "$fresh/runtime.ts";
import type { VNode } from "preact";
import { Cover } from "../components/Cover.tsx";
import { Meta } from "../components/Meta.tsx";

const pageTitle = "About";

export default function About(): VNode {
  return (
    <>
      <Head>
        <Meta title={pageTitle} />
      </Head>
      <Cover title={pageTitle}>
        <p class="my-4 dark:text-white">It's us, man!</p>
      </Cover>
    </>
  );
}
