import { Head } from "$fresh/runtime.ts";
import { Logo } from "../../components/Logo.tsx";

export default function Taxes() {
  return (
    <>
      <Head>
        <title>Ben! | Why Switch?</title>
      </Head>
      <div class="px-4 py-8 mx-0 bg-green-400">
        <div class="max-w-screen-md mx-auto flex flex-col items-center justify-center">
          <Logo />
          <h1 class="text-4xl font-bold">Death. And Taxes.</h1>
          <p class="my-4">
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
}
