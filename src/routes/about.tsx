import { Head } from "$fresh/runtime.ts";
import type { RouteConfig } from "$fresh/server.ts";
import type { JSX } from "preact";
import { Cover } from "../components/Cover.tsx";
import { Meta } from "../components/Meta.tsx";
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
      <Cover title={pageTitle}>
        <p>It's us, man!</p>
        {/* Add link to the copy right check list and work log. */}
      </Cover>
    </>
  );
}
