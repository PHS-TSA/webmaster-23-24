import { Head } from "$fresh/runtime.ts";
import type { PageProps } from "$fresh/server.ts";
import type { FunctionalComponent } from "preact";
import Title from "../../components/Title.tsx";

const Monies: FunctionalComponent<PageProps> = () => {
  const pageTitle = "Monies";

  return (
    <>
      <Head>
        <Title title={pageTitle} />
      </Head>
      <div class="flex flex-col items-center justify-center">
        <p class="prose prose-slate">
          So, you're curious about the implications of going green on your
          wallet, huh?
        </p>
      </div>
    </>
  );
};

export { Monies as default };
