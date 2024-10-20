import { Head } from "$fresh/runtime.ts";
import type { Handlers, PageProps, RouteConfig } from "$fresh/server.ts";
import { DEBUG } from "$fresh/src/server/constants.ts";
import type { JSX } from "preact";
import CalculatorScaffold from "../../components/CalculatorScaffold.tsx";
import { Cover } from "../../components/Cover.tsx";
import { Meta } from "../../components/Meta.tsx";
import { Checkbox } from "../../islands/Checkbox.tsx";
import { InputField } from "../../islands/InputField.tsx";
import { Selector, type SelectorListObject } from "../../islands/Selector.tsx";
import { Submit } from "../../islands/Submit.tsx";
import { type State, states } from "../../utils/calc/solar.ts";
import { useCsp } from "../../utils/csp.ts";
import type { FreshContextHelper } from "../../utils/handlers.ts";
import { getIpLocation } from "../../utils/ip.ts";

export const config = {
  csp: true,
} as const satisfies RouteConfig;

/**
 * The page title.
 */
const pageTitle = "Calculator" as const;

export const handler: Handlers<CalculatorSearchProps> = {
  async GET(
    _req: Request,
    ctx: FreshContextHelper<CalculatorSearchProps>,
  ): Promise<Response> {
    // Debug is true when developing to avoid rate limiting.
    // If you need to test this code, replace `DEBUG` with `false`.
    const visitor = DEBUG
      ? undefined
      : await getIpLocation(ctx.remoteAddr.hostname);

    return await ctx.render({
      region: visitor?.region,
    });
  },
};

export interface CalculatorSearchProps {
  readonly region: State | undefined;
}

/**
 * Render an about page.
 *
 * @returns The rendered about page.
 */
export default function Calculator({
  data,
}: PageProps<CalculatorSearchProps>): JSX.Element {
  useCsp();

  return (
    <>
      <Head>
        <Meta title={pageTitle} />
      </Head>
      <Cover title={pageTitle} />
      <CalculatorScaffold>
        <form
          method="GET"
          action="/calculator/results/"
          class="flex w-11/12 flex-col items-center gap-8 rounded-md bg-slate-100 p-8 text-center dark:bg-slate-900"
        >
          <Selector
            name="region"
            question="What state are you from?"
            list={states.map(
              (state: State): SelectorListObject<State> => ({
                name: state,
                value: state,
              }),
            )}
            current={data.region}
            required
          />
          <Checkbox name="hills" labelText="Is your property hilly?" />
          <Checkbox
            name="renovations"
            labelText="Is your property in need of renovations?"
          />
          <Selector
            name="geo-type"
            question="What type of geothermal system is applicable for your home?"
            list={[
              { name: "Horizontal loop", value: "horizontal" },
              { name: "Vertical loop", value: "vertical" },
              { name: "Open loop", value: "open" },
              { name: "Closed loop", value: "closed" },
            ]}
            current="horizontal"
            required
          >
            See{" "}
            <a href="/solutions/geothermal/what/">
              What Are Geothermal Energy Solutions?
            </a>
          </Selector>
          <InputField
            name="area"
            question="What is the square footage of your home?"
            required
          />
          <Checkbox
            name="permit"
            labelText="Does your county require a permit for construction?"
          />

          <Submit>Submit</Submit>
        </form>
      </CalculatorScaffold>
    </>
  );
}
