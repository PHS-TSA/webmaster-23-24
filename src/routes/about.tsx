import { Head, asset } from "$fresh/runtime.ts";
import type { RouteConfig } from "$fresh/server.ts";
import type { JSX } from "preact";
import { Content } from "../components/Content.tsx";
import { Cover } from "../components/Cover.tsx";
import { Meta } from "../components/Meta.tsx";
import { Info } from "../islands/Info.tsx";
import { useCsp } from "../utils/csp.ts";

export const config = {
  csp: true,
} as const satisfies RouteConfig;

/**
 * The page title.
 */
const pageTitle = "About" as const;

/**
 * Render an about page.
 *
 * @returns The rendered about page.
 */
export default function About(): JSX.Element {
  useCsp();

  return (
    <>
      <Head>
        <Meta title={pageTitle} />
      </Head>
      <main>
        <Cover title={pageTitle} />
        <Content>
          <div class="!whitespace-normal">
            <h2>Images</h2>
            <p>
              Logo and Graphics created with{" "}
              <a href="https://www.canva.com/">Canva</a>. All images are from{" "}
              <a href="https://www.pickpik.com">PickPik</a>,
              <Info>
                <a href="https://www.pickpik.com/terms-of-service">
                  PickPik uses a custom, royalty-free license.
                </a>
              </Info>{" "}
              <a href="https://unsplash.com">Unsplash</a>,
              <Info>
                <a href="https://unsplash.com/license">Unsplash license</a>
              </Info>{" "}
              and <a href="https://www.rawpixel.com">Rawpixel</a>.
              <Info>
                <a href="https://www.rawpixel.com/services/licenses">
                  Our usage falls under CC0.
                </a>
              </Info>{" "}
              Icons are from <a href="https://tabler.io/icons">Tabler</a>.
              <Info>
                <a href="https://github.com/tabler/tabler-icons/blob/main/LICENSE">
                  MIT licensed
                </a>
              </Info>
            </p>
            <h2>Hosting</h2>
            <p>
              This website is hosted using the fantastic{" "}
              <a href="https://deno.com/deploy">Deno Deploy</a>.
            </p>
            <h2>Sources</h2>
            <p>
              <ul>
                <li>
                  <a href="https://www.progressive.com/lifelanes/household/how-to-go-green-at-home/">
                    How To Go Green at Home | Progressive
                  </a>
                </li>
                <li>
                  <a href="https://todayshomeowner.com/hvac/guides/geothermal-hvac/">
                    The Pros and Cons Geothermal Energy for Your Home (2024) |
                    Today's Homeowner
                  </a>
                </li>
                <li>
                  <a href="https://www.energy.gov/eere/solar/homeowners-guide-federal-tax-credit-solar-photovoltaics">
                    Homeowner’s Guide to the Federal Tax Credit for Solar
                    Photovoltaics | Department of Energy
                  </a>
                </li>
                <li>
                  <a href="https://www.wastedive.com/news/california-assembly-passes-tax-exemption-on-recycling-equipment/405657/">
                    California Recycling and Composting tax write offs
                  </a>
                </li>
                <li>
                  <a href="https://www.epa.gov/green-power-markets/what-green-power">
                    What Is Green Power? | US EPA
                  </a>
                </li>
                <li>
                  <a href="https://www.nationalgrid.com/stories/energy-explained/how-does-solar-power-work">
                    How does solar power work? | Solar energy explained |
                    National Grid Group
                  </a>
                </li>
                <li>
                  <a href="https://www.forbes.com/home-improvement/solar/cost-of-solar-panels/">
                    How Much Do Solar Panels Cost In 2024?
                  </a>
                </li>
                <li>
                  <a href="https://www.britannica.com/science/geothermal-energy/History">
                    Geothermal energy - Renewable, Heat, Power | Britannica
                  </a>
                </li>
                <li>
                  <a href="https://ecotricity.co.nz/is-geothermal-really-renewable-geothermal-emissions-are-now-higher-than-coal-in-the-electricity-sector">
                    GEOTHERMAL emissions are now higher than COAL in the
                    electricity sector | Ecotricity
                  </a>
                </li>
                <li>
                  <a href="https://www.forbes.com/home-improvement/hvac/geothermal-heating-cooling-systems-cost/">
                    Average Geothermal Heating And Cooling Systems Cost | Forbes
                  </a>
                </li>
                <li>
                  <a href="https://www.warehouse-lighting.com/blogs/lighting-resources-education/solar-powered-outdoor-lights-pros-cons">
                    Pros and Cons of Solar Lights | Warehouse Lighting{" "}
                  </a>
                </li>
                <li>
                  <a href="https://www.epa.gov/facts-and-figures-about-materials-waste-and-recycling/national-overview-facts-and-figures-materials#recycling">
                    National Overview: Facts and Figures on Materials, Wastes
                    and Recycling | EPA
                  </a>
                </li>
                <li>
                  <a href="https://www.epa.gov/recycle/recycling-basics-and-benefits#overview">
                    Recycling Basics and Benefits | EPA
                  </a>
                </li>
                <li>
                  <a href="https://www.nationalgrid.com/stories/energy-explained/what-is-green-energy">
                    What is Green Energy? | National Grid
                  </a>
                </li>
                <li>
                  <a href="https://www.un.org/en/climatechange/what-is-renewable-energy">
                    What is Renewable Energy? | United Nations
                  </a>
                </li>
                <li>
                  <a href="https://energy.gov">Department of Energy</a>
                </li>
                <li>
                  <a href="https://blog.ucsusa.org/dave-reichmuth/todays-electric-vehicles-can-greatly-reduce-emissions-from-driving/">
                    Today’s Electric Vehicles Can Greatly Reduce Emissions From
                    Driving | Union of Concerned Scientists
                  </a>
                </li>
                <li>
                  <a href="https://www.nerdwallet.com/article/taxes/ev-tax-credit-electric-vehicle-tax-credit">
                    EV Tax Credit 2024: Rules and Qualifications for Electric
                    Vehicle Purchases | Nerd Wallet
                  </a>
                </li>
                <li>
                  <a href="https://www.sandiegouniontribune.com/opinion/commentary/story/2023-01-19/gas-car-ban">
                    California lawmakers are overlooking the consequences of the
                    gas-powered car ban | The San Diego Union Tribune
                  </a>
                </li>
                <li>
                  <a href="https://www.eia.gov/energyexplained/hydropower/hydropower-and-the-environment.php">
                    Hydro Power Explained | US Energy Information Administration
                  </a>
                </li>
              </ul>
            </p>
            <h2>Documentation</h2>
            <div class="flex gap-6" f-client-nav={false}>
              {/* TODO */}
              <a
                class="rounded-md bg-slate-900 p-2 text-slate-100 no-underline hover:bg-slate-800 hover:text-slate-200 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-200 dark:hover:text-slate-800"
                role="button"
                href={asset("/documentation/copyright-checklist.pdf")}
              >
                Copyright Checklist
              </a>
              <a
                class="rounded-md bg-slate-900 p-2 text-slate-100 no-underline hover:bg-slate-800 hover:text-slate-200 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-200 dark:hover:text-slate-800"
                role="button"
                href={asset("/documentation/work-log.pdf")}
              >
                Work Log
              </a>
            </div>
          </div>
        </Content>
      </main>
    </>
  );
}
