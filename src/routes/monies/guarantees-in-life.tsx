import { Head } from "$fresh/runtime.ts";
import type { PageProps } from "$fresh/server.ts";
import { Logo } from "../../components/Logo.tsx";
import type { FunctionalComponent } from "preact";

const Taxes: FunctionalComponent<PageProps> = () => {
  return (
    <>
      <Head>
        <title>Ben! | Why Switch?</title>
      </Head>
      <div class="px-4 py-8 mx-0 bg-green-400 dark:bg-green-600">
        <div class="max-w-screen-md mx-auto flex flex-col items-center justify-center">
          <Logo />
          <h1 class="text-4xl font-bold dark:text-white">Death. And Taxes.</h1>
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
