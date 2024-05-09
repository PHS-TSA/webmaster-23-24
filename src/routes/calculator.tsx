import { Head } from "$fresh/runtime.ts";
import type { Handlers, PageProps, RouteConfig } from "$fresh/server.ts";
import type { JSX } from "preact";
import { useId } from "preact/hooks";
import { Checkbox } from "../components/Checkbox.tsx";
import { Cover } from "../components/Cover.tsx";
import { Meta } from "../components/Meta.tsx";
import { Selector, type SelectorListObject } from "../islands/Selector.tsx";
import {
  type GeoCostBreakdown,
  calculatePricing,
  calculatePricingFromType,
  calculatePricingIfHardInstallation,
  calculatePricingIfRequiresPermit,
  calculatePricingMultiplierFromArea,
  geothermalLoopType,
} from "../utils/calc/geo.ts";
import {
  type State,
  type StateData,
  stateData,
  states,
} from "../utils/calc/solar.ts";
import { useCsp } from "../utils/csp.ts";
import type { FreshContextHelper } from "../utils/handlers.ts";
import { usdFormat, yearFormat } from "../utils/intl.ts";
import { getIpLocation } from "../utils/ip.ts";
import { isKey } from "../utils/type-helpers.ts";

export const config = {
  csp: true,
} as const satisfies RouteConfig;

export type CalculatorProps = CalculatorSearchProps | CalculatorShowProps;

export interface CalculatorSearchProps {
  state: "search";
  region: State | undefined;
}

export interface CalculatorShowProps {
  state: "display";
  solarRegionData: StateData;
  geoCostData: GeoCostBreakdown;
}

/**
 * The page title.
 */
const pageTitle = "Calculator" as const;

export const handler: Handlers = {
  async GET(
    req: Request,
    ctx: FreshContextHelper<CalculatorProps>,
  ): Promise<Response> {
    const visitor = await getIpLocation(ctx.remoteAddr.hostname);

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
      return <CalculatorSolarDisplay {...data} />;
  }
}

function CalculatorSolarDisplay(data: CalculatorShowProps): JSX.Element {
  return (
    <div class="w-11/12 flex flex-col sm:flex-row text-balance bg-slate-100 dark:bg-slate-900 justify-center gap-8 py-8 px-5 sm:px-10 md:px-20">
      <div class="flex flex-col gap-4 basis-1/4">
        <h2 class="font-bold text-xl">Solar Power</h2>
        <section>
          <h3 class="font-semibold text-lg">Time to Payoff</h3>
          <span>{yearFormat.format(data.solarRegionData.payoff)}</span>
        </section>
        <section>
          <h3 class="font-semibold text-lg">Savings per Month</h3>
          <span>{usdFormat.format(data.solarRegionData.savings)} </span>
        </section>
        <section>
          <h3 class="font-semibold text-lg">Install Cost</h3>
          <span>{usdFormat.format(data.solarRegionData.install)}</span>
        </section>
        <section>
          <h3 class="font-semibold text-lg">Rebate</h3>
          <span>{usdFormat.format(data.solarRegionData.rebate)}</span>
        </section>
        <section>
          <h3 class="font-semibold text-lg">Emissions per Month</h3>
          <span>
            {data.solarRegionData.emissions} pounds of Carbon per kilowatt-hour
          </span>
        </section>
      </div>

      <div class="flex flex-col gap-4 basis-1/4">
        <h2 class="font-bold text-xl">Geothermal Energy</h2>
        <section>
          <h3 class="font-semibold text-lg">Base Price</h3>
          <span>
            {usdFormat.format(calculatePricingFromType(data.geoCostData.type))}
          </span>
        </section>
        <section>
          <h3 class="font-semibold text-lg">Area-based Price Multiplier</h3>
          <span>
            {calculatePricingMultiplierFromArea(data.geoCostData.squareFootage)}
            ×
          </span>
        </section>
        <section>
          <h3 class="font-semibold text-lg">Fees for Hard Installation</h3>
          <span>
            {usdFormat.format(
              calculatePricingIfHardInstallation(
                data.geoCostData.isHilly,
                data.geoCostData.needsRenovations,
              ),
            )}
          </span>
        </section>
        <section>
          <h3 class="font-semibold text-lg">Permit fees</h3>
          <span>
            {usdFormat.format(
              calculatePricingIfRequiresPermit(data.geoCostData.requiresPermit),
            )}
          </span>
        </section>
        <section>
          <h3 class="font-semibold text-lg">Total Price</h3>
          <span>{usdFormat.format(calculatePricing(data.geoCostData))}</span>
        </section>
      </div>
    </div>
  );
}

function CalculatorSearch(data: CalculatorSearchProps): JSX.Element {
  const labelForHill = useId();
  const labelForRenovation = useId();
  const labelForArea = useId();
  const labelForPermit = useId();
  return (
    <form class="flex w-11/12 flex-col items-center gap-8 rounded-md bg-slate-100 p-8 text-center dark:bg-slate-900">
      <Selector
        name="region"
        question="What state are you from?"
        list={states.map((state: State): SelectorListObject<State> => {
          return { name: state, value: state };
        })}
        current={data.region}
        required
      />
      <Checkbox
        name="hills"
        id={labelForHill}
        labelText="Is your property hilly?"
      />
      <Checkbox
        name="renovations"
        id={labelForRenovation}
        labelText="Is your property in need of renovations?"
      />
      <Selector
        name="geo-type"
        question="What type of geothermal system would you like?"
        list={[
          { name: "Horizontal loop", value: "horizontal" },
          { name: "Vertical loop", value: "vertical" },
          { name: "Open loop", value: "open" },
          { name: "Closed loop", value: "closed" },
        ]}
        current="horizontal"
        required
      />
      <div class="top-16 flex w-72 flex-col items-center gap-4">
        <label class="text-lg" for={labelForArea}>
          What is the square footage of your home?
        </label>
        <input
          name="area"
          class="relative w-min cursor-default rounded border-2 border-slate-500 bg-slate-200 text-left shadow-md focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 dark:bg-slate-800"
          id={labelForArea}
          required
        />
      </div>
      <Checkbox
        name="permit"
        id={labelForPermit}
        labelText="Does your county require a permit?"
      />

      <button
        class="bg-slate-200 dark:bg-slate-800 text-lg border-slate-500 border-2 rounded px-3 py-2"
        type="submit"
      >
        Submit
      </button>
    </form>
  );
}
