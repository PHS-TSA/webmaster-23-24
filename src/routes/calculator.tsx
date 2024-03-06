import { Head } from "$fresh/runtime.ts";
import type { Handlers, PageProps } from "$fresh/server.ts";
import type { JSX } from "preact";
import { Cover } from "../components/Cover.tsx";
import { Meta } from "../components/Meta.tsx";
import { StateSelector } from "../islands/StateSelector.tsx";
import { type State, type StateData, stateData } from "../utils/calc.ts";
import type { FreshContextHelper } from "../utils/handlers.ts";
import { getIpLocation } from "../utils/ip.ts";
import { isKey } from "../utils/type-helpers.ts";

export type CalculatorProps = CalculatorSearchProps | CalculatorShowProps;

export interface CalculatorSearchProps {
  state: "search";
  region: State | undefined;
}

export interface CalculatorShowProps {
  state: "display";
  regionData: StateData;
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
    const state = url.searchParams.get("region");
    if (state === null) {
      return ctx.render({
        state: "search",
        region: visitor?.region,
      });
    }

    if (!isKey(stateData, state)) {
      return ctx.renderNotFound();
    }

    return ctx.render({
      state: "display",
      regionData: stateData[state],
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
  return (
    <>
      <Head>
        <Meta title={pageTitle} />
      </Head>
      <Cover title={pageTitle} />
      <main class="flex flex-col items-center bg-slate-200 p-16 dark:bg-slate-800">
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

function CalculatorDisplay(data: CalculatorShowProps): JSX.Element {
  return (
    <table className="w-11/2 w-full table-fixed border-collapse text-balance bg-slate-100 text-center *:*:*:border-l-2 *:*:*:border-b-2 *:*:*:border-green-400 first:*:*:*:border-l-0 *:*:last:*:border-b-0 dark:bg-slate-900">
      <caption>Monies</caption>
      <thead>
        <tr>
          <th>Energy Form</th>
          <th>Time to Payoff</th>
          <th>Savings per Month</th>
          <th>Install Cost</th>
          <th>Rebate</th>
          <th>Emissions per Month</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">Solar</th>
          <td>{data.regionData.payoff.toFixed(2)} Years</td>
          <td>${data.regionData.savings.toFixed(2)}</td>
          <td>${data.regionData.install.toFixed(2)}</td>
          <td>${data.regionData.rebate.toFixed(2)}</td>
          <td>{data.regionData.emissions.toFixed(2)} lbs of Carbon per kWh</td>
        </tr>
      </tbody>
    </table>
  );
}

function CalculatorSearch(data: CalculatorSearchProps): JSX.Element {
  return (
    <form class="flex w-11/12 flex-col items-center gap-8 rounded-md bg-slate-100 p-8 text-center dark:bg-slate-900">
      <StateSelector currentState={data.region} />

      <button
        class="bg-slate-200 dark:bg-slate-800 text-lg border-gray-500 border-2 rounded px-3 py-2"
        type="submit"
      >
        Submit
      </button>
    </form>
  );
}
