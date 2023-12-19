import { Head } from "$fresh/runtime.ts";
import Logo from "../components/Logo.tsx";
import type { FunctionalComponent } from "preact";
import type { PageProps } from "$fresh/server.ts";
import Meta from "../components/Meta.tsx";

const pageTitle = "About";

const About: FunctionalComponent<PageProps> = () => (
  <>
    <Head>
      <Meta title={pageTitle} />
    </Head>
    <div class="px-4 py-8 mx-0 bg-green-500 dark:bg-green-700">
      <div class="max-w-screen-md mx-auto flex flex-col items-center justify-center">
        <Logo />
        <h1 class="text-4xl font-bold dark:text-white">{pageTitle}</h1>
        <p class="my-4 dark:text-white">
          It's us, man!
        </p>
      </div>
    </div>
  </>
);

export { About as default };
