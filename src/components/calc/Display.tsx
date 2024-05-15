import type { JSX } from "preact";
import type { ComponentChildren } from "preact";
import {
  calculatePricing,
  calculatePricingFromType,
  calculatePricingIfHardInstallation,
  calculatePricingIfRequiresPermit,
  calculatePricingMultiplierFromArea,
} from "../../utils/calc/geo.ts";
import { IconCheck } from "../../utils/icons.ts";
import { usdFormat, yearFormat } from "../../utils/intl.ts";
import type { CalculatorShowProps } from "./props.ts";

export function CalculatorDisplay(data: CalculatorShowProps): JSX.Element {
  const geoCost = calculatePricing(data.geoCostData);
  const isSolarBest = data.solarRegionData.install < geoCost;

  return (
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
            calculatePricingIfRequiresPermit(data.geoCostData.requiresPermit),
          )}
        />
        <Info title="Total Price" text={usdFormat.format(geoCost)} />
      </InfoColumn>
    </div>
  );
}

interface InfoColumnProps {
  title: string;
  children: ComponentChildren;
  best?: boolean | undefined;
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
  title: string;
  text: string;
}

function Info({ title, text }: InfoProps): JSX.Element {
  return (
    <section class="h-20">
      <h3 class="font-semibold text-lg">{title}</h3>
      <span>{text}</span>
    </section>
  );
}
