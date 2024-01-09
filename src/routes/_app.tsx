import { Head, Partial, asset } from "$fresh/runtime.ts";
import type { PageProps } from "$fresh/server.ts";
import type { VNode } from "preact";
import { description, faviconPngUrl, faviconSvgUrl } from "../site.ts";

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
    <link rel="apple-touch-icon" href="/favicon.png" />
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
    <link rel="icon" type="image/svg+xml" href={asset(faviconSvgUrl)} />
    <link
      rel="icon"
      sizes="48x48"
      type="image/png"
      href={asset(faviconPngUrl)}
    />
  </>
);

export default function App({ Component }: PageProps): VNode {
  return (
    <html lang="en-US">
      <Head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link href={asset("/styles.css")} rel="preload" as="style" />
        <meta name="description" content={description} key="desc" />
        <meta name="keywords" content="green, clean, renewable, tsa" />
        <link rel="manifest" href="/manifest.webmanifest" />
        {metas}
        <link rel="stylesheet" href={asset("/styles.css")} />
      </Head>

      <body f-client-nav class="dark:bg-black">
        <Partial name="body">
          <Component />
        </Partial>
      </body>
    </html>
  );
}
