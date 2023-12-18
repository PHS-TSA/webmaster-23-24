import { Head } from "$fresh/runtime.ts";
import type { PageProps } from "$fresh/server.ts";
import type { FunctionalComponent } from "preact";
import Meta from "../../components/Meta.tsx";

const Green: FunctionalComponent<PageProps> = () => {
  const pageTitle = "Going Green!";

  return (
    <>
      <Head>
        <Meta title={pageTitle} />
      </Head>
      <div class="flex flex-col items-center justify-center">
        <p class="prose prose-slate">
          So, you've made the decision to switch to green energy, huh?
        </p>
      </div>
    </>
  );
};

export { Green as default };
