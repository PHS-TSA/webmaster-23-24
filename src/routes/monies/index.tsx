import { Head } from "$fresh/runtime.ts";
import type { PageProps } from "$fresh/server.ts";
import type { FunctionalComponent } from "preact";

const Monies: FunctionalComponent<PageProps> = () => {
  return (
    <>
      <Head>
        <title>Monies | Why Switch?</title>
      </Head>
      <div>
        So, you're curious about the implications of going green on your wallet,
        huh?
      </div>
    </>
  );
};

export { Monies as default };
