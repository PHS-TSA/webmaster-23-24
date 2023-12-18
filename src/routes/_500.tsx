import { Head } from "$fresh/runtime.ts";
import type { PageProps } from "$fresh/server.ts";
import Logo from "../components/Logo.tsx";
import type { FunctionalComponent } from "preact";
import Meta from "../components/Meta.tsx";

const Error500: FunctionalComponent<PageProps> = () => {
  const pageTitle = "500 — Internal Server Error";

  return (
    <>
      <Head>
        <Meta title={pageTitle} />
      </Head>
      <div class="px-4 py-8 mx-0 bg-green-500 dark:bg-green-700">
        <div class="max-w-screen-md mx-auto flex flex-col items-center justify-center">
          <Logo />
          <h1 class="text-4xl font-bold dark:text-white">{pageTitle}</h1>
          <p class="my-4 dark:text-white">
            An internal server error occurred.
          </p>
          <a href="/" class="underline">Go back home</a>
        </div>
      </div>
    </>
  );
};

export { Error500 as default };
