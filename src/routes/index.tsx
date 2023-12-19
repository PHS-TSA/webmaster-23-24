import { Head } from "$fresh/runtime.ts";
import type { PageProps } from "$fresh/server.ts";
import type { FunctionalComponent } from "preact";
import Cover from "../components/Cover.tsx";
import Meta from "../components/Meta.tsx";
import { siteName } from "../site.ts";

const pageTitle = "Home";

const Home: FunctionalComponent<PageProps> = () => (
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

export { Home as default };
