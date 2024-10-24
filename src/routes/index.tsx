import { Head, asset } from "$fresh/runtime.ts";
import type { RouteConfig } from "$fresh/server.ts";
import { clsx } from "clsx";
import type { JSX } from "preact";
import type { ComponentChildren } from "preact";
import { Carousel } from "../components/Carousel.tsx";
import { Cover, type HeroProps } from "../components/Cover.tsx";
import { Logo } from "../components/Logo.tsx";
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
  readonly children: ComponentChildren;
  readonly cols?: string;
  readonly media: CardMedia;
}

interface CardMedia {
  readonly src: string;
  readonly alt: string;
  readonly width: number;
  readonly height: number;
  readonly side: "left" | "right";
}

function Card({ children, cols, media }: CardProps): JSX.Element {
  return (
    <div
      class={clsx(
        "inline-grid items-center justify-items-center rounded-xl bg-slate-300 p-8 shadow-lg md:grid md:grid-cols-4 dark:bg-slate-700",
        cols,
      )}
    >
      <img
        src={asset(media.src)}
        alt={media.alt}
        class={clsx(
          "rounded shadow-md md:row-start-1 md:row-end-2",
          media.side === "left"
            ? "md:col-start-1 md:col-end-2"
            : "md:col-start-4 md:col-end-5",
        )}
        height={media.height}
        width={media.width}
      />

      <p
        class={clsx(
          "prose prose-xl prose-slate max-w-full p-4 dark:prose-invert md:row-start-1 md:row-end-2",
          media.side === "left"
            ? "md:col-start-2 md:col-end-5"
            : "md:col-start-1 md:col-end-4",
        )}
      >
        {children}
      </p>
    </div>
  );
}

function CarouselHero({ children }: HeroProps): JSX.Element {
  return (
    <Carousel
      heros={[
        "/images/solar-environment.avif",
        "/images/other-electric-cars.avif",
        "/images/geothermal-worth-it.avif",
        "/images/other-wind.avif",
      ]}
      scrollDown={true}
    >
      {children}
    </Carousel>
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
      <Cover
        Hero={CarouselHero}
        icon={<Logo animated={true} class="size-32 backdrop-blur-sm" />}
        title={siteName}
      >
        <p>
          Looking for information about modern power sources? You've come to the
          right place!
        </p>
      </Cover>

      <div class="bg-slate-200 p-5 sm:p-10 lg:p-20 dark:bg-slate-800">
        <div class="grid gap-y-10 md:grid-cols-4">
          <Card
            media={{
              src: "/images/intro.avif",
              alt: "A wind farm",
              side: "right",
              width: 656,
              height: 300,
            }}
            cols="md:col-start-1 md:col-end-4"
          >
            Over the past 50 years, people have truly recognized global warming
            and the threat it poses. Every year, thousands of scientists spend
            countless hours trying to figure out how to reduce the effects of
            climate change. The most promising solution by far is green energy.
            By swapping over to green energy, we can cut the problem off at the
            root. First though, what exactly is green energy?
          </Card>
          <Card
            media={{
              src: "/images/impact.avif",
              alt: "A categorization of non-renewable, renewable and green energy sources",
              side: "left",
              width: 768,
              height: 460,
            }}
            cols="md:col-start-2 md:col-end-5"
          >
            According to the Environmental Protection Agency, or EPA, "green
            power is a subset of renewable energy. It represents those renewable
            energy resources and technologies that provide the greatest
            environmental benefit." Many people don't realize that this
            "environmental benefit" doesn't just impact far-off tropics, it also
            impacts your local environment. Conventional power sources such as
            oil often ravage environments when events like oil spills happen. In
            contrast, green energy doesn't have this risk.
          </Card>
          <Card
            media={{
              src: "/images/emissions.webp",
              alt: "A comparison of carbon emissions between various renewable and non-renewable energy sources",
              side: "right",
              width: 1841,
              height: 1105,
            }}
            cols="md:col-start-1 md:col-end-4"
          >
            How can you help invest in green energy and reduce carbon emissions?
            It's actually pretty simple. You can buy solar panels for your
            house, purchase a geothermal heating system, or even just recycle.
            There are so many ways to save money and save the environment at the
            same time!
          </Card>
          <Card
            media={{
              src: "/images/other-utilities.avif",
              alt: "Man putting up solar panels",
              side: "left",
              width: 500,
              height: 375,
            }}
            cols="md:col-start-2 md:col-end-5"
          >
            Recently, the government passed the Public Land Renewable Energy
            Development Act of 2023, which gives land grants to companies in the
            green energy field. This is similar to what happened with railroad
            grants in the 19th century, which caused an economic boom.
            Additionally, the Biden-Harris administration passed The Inflation
            Reduction Act of 2022. This bill provides tax deductions for green
            renovations. Make sure not to miss out on the great opportunities
            that these bills offer consumers!
          </Card>
        </div>
        <div class="p-16">
          <CallToAction />
        </div>
      </div>
    </>
  );
}

function CallToAction(): JSX.Element {
  return (
    <a
      class="w-fit rounded bg-slate-400 p-4 text-slate-900 shadow-sm hover:bg-slate-300 dark:bg-slate-600 dark:text-slate-100 dark:hover:bg-slate-700"
      href="/green/"
    >
      Convinced? 5 Easy Ways to Get Started Today!
    </a>
  );
}
