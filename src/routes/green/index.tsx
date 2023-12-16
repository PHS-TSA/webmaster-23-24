import { Head } from "$fresh/runtime.ts";
import type { PageProps } from "$fresh/server.ts";
import type { FunctionalComponent } from "preact";

const Green: FunctionalComponent<PageProps> = () => {
  return (
    <>
      <Head>
        <title>Going Green! | Why Switch?</title>
      </Head>
      <div>
        So you've made the decision to switch to green energy, huh?
      </div>
    </>
  );
};

export { Green as default };
