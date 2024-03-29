import { Head } from "$fresh/runtime.ts";
import type { RouteConfig } from "$fresh/server.ts";
import type { JSX, RenderableProps } from "preact";
import { Cover } from "../components/Cover.tsx";
import { Meta } from "../components/Meta.tsx";
import { siteName } from "../site.ts";
import { useCsp } from "../utils/csp.ts";

export const config = {
  csp: true,
} as const satisfies RouteConfig;

/**
 * The page title.
 */
const pageTitle = "Home" as const;

interface CardProps {
  image: string;
  alt: string;
  cols?: string;
  imgSide: "left" | "right";
}

function Card({
  image,
  alt,
  children,
  cols,
  imgSide,
}: RenderableProps<CardProps>): JSX.Element {
  return (
    <div
      class={`inline-grid items-center rounded-xl bg-slate-300 dark:bg-slate-200 p-8 md:grid md:grid-cols-4 ${cols}`}
    >
      <img
        src={image}
        alt={alt}
        class={`md:row-start-1 md:row-end-2 ${
          imgSide === "left"
            ? "md:col-start-1 md:col-end-2"
            : "md:col-start-4 md:col-end-5"
        }`}
        loading="lazy"
      />

      <p
        class={`prose prose-slate prose-xl p-4 md:row-start-1 md:row-end-2 ${
          imgSide === "left"
            ? "md:col-start-2 md:col-end-5"
            : "md:col-start-1 md:col-end-4"
        }`}
      >
        {children}
      </p>
    </div>
  );
}

/**
 * Render the home page.
 *
 * @returns The rendered home page.
 */
export default function Home(): JSX.Element {
  useCsp();

  return (
    <>
      <Head>
        <Meta title={pageTitle} />
      </Head>
      <Cover title={siteName}>
        <p>
          Looking for information about solar power? You've come to the right
          place!
        </p>
      </Cover>

      <div class="gap-y-10 bg-slate-200 px-5 py-5 sm:px-10 sm:py-10 lg:px-20 lg:py-20 grid md:grid-cols-4 dark:bg-slate-800">
        <Card
          image="/images/intro.jpg"
          alt="A wind farm"
          cols="md:col-start-1 md:col-end-4"
          imgSide="right"
        >
          Over the past 50 years, people have truly recognized global warming
          and the threat it poses. Every year, thousands of scientists spend
          countless hours trying to figure out how to reduce the effects of
          climate change. The most promising solution by far is green energy. By
          swapping over to green energy, we can cut the problem off at the root.
          First though, what exactly is green energy?
        </Card>
        <Card
          image="/images/impact.svg"
          alt="A categorization of non-renewable, renewable and green energy sources"
          cols="md:col-start-1 md:col-end-5"
          imgSide="left"
        >
          According to the Environmental Protection Agency, or EPA, "green power
          is a subset of renewable energy. It represents those renewable energy
          resources and technologies that provide the greatest environmental
          benefit." Many people don't realize that this "environmental benefit"
          doesn't just impact far-off tropics, it also impacts your local
          environment. Conventional power sources such as oil often ravage
          environments when events like oil spills happen. In contrast, green
          energy doesn't have this risk.
        </Card>
        <Card
          image="/images/emissions.gif"
          alt="A comparison of carbon emissions between various renewable and non-renewable energy sources"
          cols="md:col-start-2 md:col-end-5"
          imgSide="left"
        >
          How can you help invest in green energy and reduce carbon emissions?
          It's actually pretty simple. You can buy solar panels for your house,
          purchase a geothermal heating system, or even just recycle. There are
          so many ways to save money and save the environment at the same time!
        </Card>
        <Card
          image="/images/utility_companies.avif"
          alt="Man putting up solar panels"
          cols="md:col-start-1 md:col-end-4"
          imgSide="right"
        >
          Recently, the government passed the Public Land Renewable Energy
          Development Act of 2023, which gives land grants to companies creating
          green energy. This is similar to what happened with railroad grants in
          the 19th century, which caused an economic boom. Make sure not to miss
          out on the great opportunities that this offers consumers!
        </Card>
      </div>
    </>
  );
}
