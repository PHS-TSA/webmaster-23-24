import { Head } from "$fresh/runtime.ts";
import { Logo } from "../components/Logo.tsx";
import type { FunctionalComponent } from "preact";
import type { PageProps } from "$fresh/server.ts";

const About: FunctionalComponent<PageProps> = () => {
  return (
    <>
      <Head>
        <title>About | Why Switch?</title>
      </Head>
      <div class="px-4 py-8 mx-0 bg-green-400 dark:bg-green-600">
        <div class="max-w-screen-md mx-auto flex flex-col items-center justify-center">
          <Logo />
          <h1 class="text-4xl font-bold dark:text-white">About</h1>
          <p class="my-4 dark:text-white">
            It's us, man!
          </p>
        </div>
      </div>
    </>
  );
};

export { About as default };
