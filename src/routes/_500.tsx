import { Head } from "$fresh/runtime.ts";
import type { PageProps } from "$fresh/server.ts";
import Logo from "../components/Logo.tsx";
import type { FunctionalComponent } from "preact";

const Error500: FunctionalComponent<PageProps> = () => {
  return (
    <>
      <Head>
        <title>500 - Internal Server Error | Why Switch?</title>
      </Head>
      <div class="px-4 py-8 mx-0 bg-green-400 dark:bg-green-600">
        <div class="max-w-screen-md mx-auto flex flex-col items-center justify-center">
          <Logo />
          <h1 class="text-4xl font-bold dark:text-white">
            500 - Internal Server Error!
          </h1>
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
