import { Head } from "$fresh/runtime.ts";
import type { Handlers, PageProps, RouteConfig } from "$fresh/server.ts";
import { Schema } from "@effect/schema";
import { IconCheck } from "@tabler/icons-preact";
import { Either } from "effect";
import type { ComponentChildren, JSX } from "preact";
import CalculatorScaffold from "../../components/CalculatorScaffold.tsx";
import { Cover } from "../../components/Cover.tsx";
import { Meta } from "../../components/Meta.tsx";
import {
  type GeoCostBreakdown,
  GeothermalLoopTypeSchema,
  calculatePricing,
  calculatePricingFromType,
  calculatePricingIfHardInstallation,
  calculatePricingIfRequiresPermit,
  calculatePricingMultiplierFromArea,
} from "../../utils/calc/geo.ts";
import { type StateData, stateData } from "../../utils/calc/solar.ts";
import { useCsp } from "../../utils/csp.ts";
import type { FreshContextHelper } from "../../utils/handlers.ts";
import { usdFormat, yearFormat } from "../../utils/intl.ts";

export const config = {
  csp: true,
} as const satisfies RouteConfig;

/**
 * The page title.
 */
const pageTitle = "Calculator Results" as const;

export const handler: Handlers<CalculatorShowProps> = {
  async GET(
    req: Request,
    ctx: FreshContextHelper<CalculatorShowProps>,
  ): Promise<Response> {
    const url = new URL(req.url);
    const data = url.searchParams;
    const parsedData = parseData(data);

    if (parsedData === undefined) {
      return await ctx.renderNotFound();
    }

    return await ctx.render(parsedData);
  },

  async POST(
    req: Request,
    ctx: FreshContextHelper<CalculatorShowProps>,
  ): Promise<Response> {
    const data = await req.formData();
    const parsedData = parseData(data);

    if (parsedData === undefined) {
      return await ctx.renderNotFound();
    }

    return await ctx.render(parsedData);
  },
};

function parseData(
  data: FormData | URLSearchParams,
): CalculatorShowProps | undefined {
  const region = data.get("region[value]")?.toString();
  const isHilly = data.get("hills")?.toString() ?? "";
  const renovations = data.get("renovations")?.toString() ?? "";
  const geoType = Schema.decodeUnknownEither(GeothermalLoopTypeSchema)(
    data.get("geo-type[value]")?.toString(),
  );
  const squareFootage = data.get("area")?.toString();
  const requiresPermit = data.get("permit")?.toString() ?? "";

  if (
    Either.isRight(geoType) &&
    region !== undefined &&
    Object.hasOwn(stateData, region)
  ) {
    return {
      solarRegionData:
        stateData[
          // See microsoft/TypeScript#44253
          region as keyof typeof stateData
        ],
      geoCostData: {
        isHilly: Boolean(isHilly),
        needsRenovations: Boolean(renovations),
        type: geoType.right,
        squareFootage: Number(squareFootage),
        requiresPermit: Boolean(requiresPermit),
      },
    };
  }

  return undefined;
}

export interface CalculatorShowProps {
  readonly solarRegionData: StateData;
  readonly geoCostData: GeoCostBreakdown;
}

export default function CalculatorResults({
  data,
}: PageProps<CalculatorShowProps>): JSX.Element {
  useCsp();

  const geoCost = calculatePricing(data.geoCostData);
  const isSolarBest = data.solarRegionData.install < geoCost;

  return (
    <>
      <Head>
        <Meta title={pageTitle} />
      </Head>
      <Cover title={pageTitle} />
      <CalculatorScaffold>
        <div class="w-11/12 flex flex-col sm:flex-row text-balance bg-slate-100 dark:bg-slate-900 justify-center gap-8 py-8 px-5 md:px-10 lg:px-20">
          <InfoColumn title="Solar Power" best={isSolarBest}>
            <Info
              title="Rebate"
              text={usdFormat.format(data.solarRegionData.rebate)}
            />
            <Info
              title="Time to Payoff"
              text={yearFormat.format(data.solarRegionData.payoff)}
            />
            <Info
              title="Savings per Month"
              text={usdFormat.format(data.solarRegionData.savings)}
            />
            <Info
              title="Emission Savings"
              text={`${data.solarRegionData.emissions} pounds of Carbon per kilowatt-hour`}
            />
            <Info
              title="Total Price"
              text={usdFormat.format(data.solarRegionData.install)}
            />
          </InfoColumn>

          <InfoColumn title="Geothermal Energy" best={!isSolarBest}>
            <Info
              title="Base Price"
              text={usdFormat.format(
                calculatePricingFromType(data.geoCostData.type),
              )}
            />
            <Info
              title="Area-based Price Multiplier"
              text={`${calculatePricingMultiplierFromArea(
                data.geoCostData.squareFootage,
              )}×`}
            />
            <Info
              title="Fees for Hard Installation"
              text={usdFormat.format(
                calculatePricingIfHardInstallation(
                  data.geoCostData.isHilly,
                  data.geoCostData.needsRenovations,
                ),
              )}
            />
            <Info
              title="Permit fees"
              text={usdFormat.format(
                calculatePricingIfRequiresPermit(
                  data.geoCostData.requiresPermit,
                ),
              )}
            />
            <Info title="Total Price" text={usdFormat.format(geoCost)} />
          </InfoColumn>
        </div>
      </CalculatorScaffold>
    </>
  );
}

interface InfoColumnProps {
  readonly title: string;
  readonly children: ComponentChildren;
  readonly best?: boolean | undefined;
}

function InfoColumn({ title, children, best }: InfoColumnProps): JSX.Element {
  return (
    <div class="relative flex flex-col gap-4 basis-2/5 lg:basis-1/4">
      <div class="flex gap-3">
        <h2 class="font-bold text-xl h-14">{title}</h2>
        {best && (
          <div title="This option is the most cost-effective!">
            <IconCheck color="blue" />
          </div>
        )}
      </div>
      {children}
    </div>
  );
}

interface InfoProps {
  readonly title: string;
  readonly text: string;
}

function Info({ title, text }: InfoProps): JSX.Element {
  return (
    <section class="h-20">
      <h3 class="font-semibold text-lg">{title}</h3>
      <span>{text}</span>
    </section>
  );
}
