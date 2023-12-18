import { Head } from "$fresh/runtime.ts";
import type { PageProps } from "$fresh/server.ts";
import Logo from "../../components/Logo.tsx";
import type { FunctionalComponent } from "preact";
import Meta from "../../components/Meta.tsx";

const Taxes: FunctionalComponent<PageProps> = () => {
  const pageTitle = "Death. And Taxes.";

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
            Looking for information about tax rebates and incentives for green
            energy?
            <br />
            Please keep in mind that, like death, taxes are a certainty, and
            thus tax evasion is illegal. If you wish to avoid taxes, please
            consult a registered accountant rather than willy-nilly skipping
            them based on our advice.
          </p>
        </div>
      </div>
    </>
  );
};

export { Taxes as default };
