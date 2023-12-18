import { Head } from "$fresh/runtime.ts";
import type { FunctionalComponent } from "preact";
import Logo from "../components/Logo.tsx";
import type { PageProps } from "$fresh/server.ts";
import { siteName } from "../site.ts";
import Meta from "../components/Meta.tsx";

const Home: FunctionalComponent<PageProps> = () => {
  const pageTitle = "Home";

  return (
    <>
      <Head>
        <Meta title={pageTitle} />
      </Head>
      <div class="px-4 py-8 mx-0 bg-green-500 dark:bg-green-700">
        <div class="max-w-screen-md mx-auto flex flex-col items-center justify-center">
          <Logo />
          <h1 class="text-4xl font-bold dark:text-white">{siteName}</h1>
          <p class="my-4 dark:text-white">
            Looking for information about solar power? You've come to the right
            place!
          </p>
        </div>
      </div>
    </>
  );
};

export { Home as default };
