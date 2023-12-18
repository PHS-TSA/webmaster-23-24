import type { PageProps } from "$fresh/server.ts";
import { Partial } from "$fresh/runtime.ts";
import type { FunctionalComponent } from "preact";

const App: FunctionalComponent<PageProps> = ({ Component }) => {
  return (
    <html lang="en-US">
      <head>
        <meta charset="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        />
        <title>Why Switch?</title>
        <meta
          name="description"
          content="Why Switch is a website about green/green energy."
          key="description"
        >
        </meta>
        <link rel="stylesheet" href="/styles.css" />
      </head>

      <body f-client-nav class="dark:bg-black">
        <Partial name="body">
          <Component />
        </Partial>
      </body>
    </html>
  );
};

export { App as default };
