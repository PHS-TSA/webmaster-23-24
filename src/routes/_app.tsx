import { Head, Partial } from "$fresh/runtime.ts";
import type { PageProps } from "$fresh/server.ts";
import type { FunctionalComponent } from "preact";
import { description as desc, faviconPngUrl, faviconSvgUrl } from "../site.ts";

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
    <link rel="icon" type="image/svg+xml" href={faviconSvgUrl} />
    <link rel="icon" sizes="48x48" type="image/png" href={faviconPngUrl} />
  </>
);

const App: FunctionalComponent<PageProps> = ({ Component }) => (
  <html lang="en-US">
    <Head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link href="/styles.css" rel="preload" as="style" />
      <link href="/manifest.webmanifest" rel="preload" as="manifest" />
      <meta name="description" content={desc} key="desc" />
      <meta name="keywords" content="green, clean, renewable, tsa" />
      <link rel="manifest" href="/manifest.webmanifest" />
      {metas}
      <link rel="stylesheet" href="/styles.css" />
    </Head>

    <body f-client-nav class="dark:bg-black">
      <Partial name="body">
        <Component />
      </Partial>
    </body>
  </html>
);

export { App as default };
