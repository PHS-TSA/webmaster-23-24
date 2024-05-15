import { Head } from "$fresh/runtime.ts";
import type { Handlers, PageProps, RouteConfig } from "$fresh/server.ts";
import { DEBUG } from "$fresh/src/server/constants.ts";
import type { JSX } from "preact";
import { Cover } from "../components/Cover.tsx";
import { Meta } from "../components/Meta.tsx";
import { CalculatorDisplay } from "../components/calc/Display.tsx";
import { CalculatorSearch } from "../components/calc/Search.tsx";
import type { CalculatorProps } from "../components/calc/props.ts";
import { geothermalLoopType } from "../utils/calc/geo.ts";
import { stateData } from "../utils/calc/solar.ts";
import { useCsp } from "../utils/csp.ts";
import type { FreshContextHelper } from "../utils/handlers.ts";
import { getIpLocation } from "../utils/ip.ts";
import { isKey } from "../utils/type-helpers.ts";

export const config = {
  csp: true,
} as const satisfies RouteConfig;

/**
 * The page title.
 */
const pageTitle = "Calculator" as const;

export const handler: Handlers = {
  async GET(
    req: Request,
    ctx: FreshContextHelper<CalculatorProps>,
  ): Promise<Response> {
    const url = new URL(req.url);
    const state = url.searchParams.get("region[value]");
    const isHilly = url.searchParams.get("hills");
    const renovations = url.searchParams.get("renovations");
    const geoType = geothermalLoopType.safeParse(
      url.searchParams.get("geo-type[value]"),
    );
    const squareFootage = url.searchParams.get("area");
    const requiresPermit = url.searchParams.get("permit");

    if (!state) {
      const visitor = DEBUG
        ? undefined
        : await getIpLocation(ctx.remoteAddr.hostname);

      return ctx.render({
        state: "search",
        region: visitor?.region,
      });
    }

    if (!(geoType.success && squareFootage)) {
      return ctx.renderNotFound();
    }

    if (!isKey(stateData, state)) {
      return ctx.renderNotFound();
    }

    return ctx.render({
      state: "display",
      solarRegionData: stateData[state],
      geoCostData: {
        isHilly: Boolean(isHilly),
        needsRenovations: Boolean(renovations),
        type: geoType.data,
        squareFootage: Number(squareFootage),
        requiresPermit: Boolean(requiresPermit),
      },
    });
  },
};

/**
 * Render an about page.
 *
 * @returns The rendered about page.
 */
export default function Calculator({
  data,
}: PageProps<CalculatorProps>): JSX.Element {
  useCsp();

  return (
    <>
      <Head>
        <Meta title={pageTitle} />
      </Head>
      <Cover title={pageTitle} />
      <main class="flex flex-col bg-slate-200 p-16 dark:bg-slate-800 place-items-center">
        <span class="p-5 text-lg">
          Calculate and compare the pricing for solar and geothermal.
        </span>
        <CalculatorPages {...data} />
      </main>
    </>
  );
}

function CalculatorPages(data: CalculatorProps): JSX.Element {
  switch (data.state) {
    case "search":
      return <CalculatorSearch {...data} />;

    case "display":
      return <CalculatorDisplay {...data} />;
  }
}
