import { Head } from "$fresh/runtime.ts";
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
const pageTitle = "Going Green" as const;

/**
 * Render a "going green" page.
 *
 * @returns The rendered about page.
 */
export default function Green(): JSX.Element {
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
            <h2>Going Green?</h2>
            <p>
              Are you investigating going green? Here are some easy ways to get
              started!
              <ul>
                <li>
                  Check if your power company supports green energy initiatives.{" "}
                  <Info>
                    See{" "}
                    <a href="/solutions/other/utilities/">
                      Utility Companies’ Green Programs
                    </a>
                  </Info>
                </li>
                <li>
                  Switch to sustainable light bulbs.{" "}
                  <Info>
                    See <a href="/solutions/other/led-lights/">LED Lights</a>
                  </Info>
                </li>
                <li>
                  Sign up for online billing.{" "}
                  <Info>
                    See <a href="/solutions/other/billing/">Online Billing</a>
                  </Info>
                </li>
                <li>
                  Consider installing a solar or geothermal energy system.{" "}
                  <Info>
                    Try out our <a href="/calculator/">pricing calculator</a>!
                  </Info>
                </li>
                <li>
                  Sign up for green energy news.{" "}
                  <Info>
                    CleanEnergy.gov{" "}
                    <a href="https://whitehouse.us1.list-manage.com/subscribe?u=c2703e4c5744511c4475d3999&id=f0fd3ebb6e">
                      newsletter signup
                    </a>
                  </Info>
                </li>
              </ul>
            </p>
            Any other questions? Feel free to ask our AI chatbot over there on
            the bottom right!
          </div>
        </Content>
      </main>
    </>
  );
}
