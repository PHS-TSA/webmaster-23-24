import { Head } from "$fresh/runtime.ts";
import type { PageProps } from "$fresh/server.ts";
import type { FunctionalComponent } from "preact";
import Cover from "../components/Cover.tsx";
import Meta from "../components/Meta.tsx";

const pageTitle = "About";

const About: FunctionalComponent<PageProps> = () => (
  <>
    <Head>
      <Meta title={pageTitle} />
    </Head>
    <Cover title={pageTitle}>
      <p class="my-4 dark:text-white">It's us, man!</p>
    </Cover>
  </>
);

export { About as default };
