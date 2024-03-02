import { Head, asset } from "$fresh/runtime.ts";
import type { PageProps } from "$fresh/server.ts";
import type { JSX } from "preact";
import { description, keywords } from "../site.ts";

/**
 * The global meta tags.
 */
const metas = (
  <>
    <meta
      name="theme-color"
      media="(prefers-color-scheme: light)"
      content="#22C55E"
    />
    <meta
      name="theme-color"
      media="(prefers-color-scheme: dark)"
      content="#15803D"
    />
    <meta name="mobile-web-app-capable" content="yes" />
    <meta name="theme-color" content="#005" />
    <meta name="apple-mobile-web-app-capable" content="yes" />
    {/* <link rel="apple-touch-icon" href="/favicon.png" /> */}
    <meta
      name="apple-mobile-web-app-status-bar-style"
      content="black-translucent"
    />

    <meta name="geo.region" content="US-MO" />
    <meta
      name="geo.placename"
      content="Maryland Heights, Missouri, United States"
    />
    <meta name="geo.position" content="38.7413922,-90.456632" />
    <meta name="ICBM" content="38.7413922,-90.456632" />

    <link rel="sitemap" type="application/xml" href="/sitemap.xml" />
    {/* <link rel="icon" type="image/svg+xml" href={asset(faviconSvgUrl)} /> */}
    {/* <link
      rel="icon"
      sizes="48x48"
      type="image/png"
      href={asset(faviconPngUrl)}
    /> */}
  </>
);

/**
 * Render the application.
 * This is the entry point for the application.
 * It renders the application's layout and the current page.
 * It also renders the global meta tags and styles.
 * In addition, it enables client-side navigation.
 *
 * @param props - The component's properties.
 * @param props.Component - The page component.
 * @returns The rendered application.
 */
export default function App({ Component }: PageProps): JSX.Element {
  return (
    <html lang="en-US">
      <Head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link href={asset("/styles.css")} rel="preload" as="style" />
        <meta name="description" content={description} key="desc" />
        <meta name="keywords" content={keywords} key="keys" />
        <link rel="manifest" href="/manifest.webmanifest" />
        {metas}
        <link rel="stylesheet" href={asset("/styles.css")} />
      </Head>

      <body f-client-nav class="dark:bg-black dark:text-white">
        <Component />
      </body>
    </html>
  );
}
