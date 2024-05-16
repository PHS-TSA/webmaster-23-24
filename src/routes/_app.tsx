import { Head, Partial, asset } from "$fresh/runtime.ts";
import type { PageProps } from "$fresh/server.ts";
import type { JSX } from "preact";
import {
  appleTouchIconPngUrl,
  description,
  faviconIcoUrl,
  keywords,
  logoSvgUrl,
} from "../site.ts";

/**
 * The global meta tags.
 */
const metas = (
  <>
    <link rel="icon" href={faviconIcoUrl} sizes="48x48" />
    <link rel="icon" href={logoSvgUrl} sizes="any" type="image/svg+xml" />
    <link rel="apple-touch-icon" href={appleTouchIconPngUrl} />
    <meta name="mobile-web-app-capable" content="yes" />
    <meta name="theme-color" content="#005" />
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta
      name="apple-mobile-web-app-status-bar-style"
      content="black-translucent"
    />
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
    <meta name="geo.region" content="US-MO" />
    <meta
      name="geo.placename"
      content="Maryland Heights, Missouri, United States"
    />
    <meta name="geo.position" content="38.7413922,-90.456632" />
    <meta name="ICBM" content="38.7413922,-90.456632" />
    <link rel="sitemap" type="application/xml" href="/sitemap.xml" />
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
    <html lang="en-US" class="scroll-smooth">
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

      <body f-client-nav class="dark:bg-slate-950 dark:text-slate-50">
        <Partial name="body">
          <Component />
        </Partial>
      </body>
    </html>
  );
}
