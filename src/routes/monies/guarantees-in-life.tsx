import { Head } from "$fresh/runtime.ts";
import type { VNode } from "preact";
import { Cover } from "../../components/Cover.tsx";
import { Meta } from "../../components/Meta.tsx";

const pageTitle = "Death. And Taxes.";

export default function Taxes(): VNode {
  return (
    <>
      <Head>
        <Meta title={pageTitle} />
      </Head>
      <Cover title={pageTitle}>
        <p class="my-4 dark:text-white">
          Looking for information about tax rebates and incentives for green
          energy?
          <br />
          Please keep in mind that, like death, taxes are a certainty, and thus
          tax evasion is illegal. If you wish to avoid taxes, please consult a
          registered accountant rather than willy-nilly skipping them based on
          our advice.
        </p>
      </Cover>
    </>
  );
}
