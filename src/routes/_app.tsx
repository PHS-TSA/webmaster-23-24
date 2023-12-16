import type { PageProps } from "$fresh/server.ts";
import { Partial } from "$fresh/runtime.ts";

export default function App({ Component }: PageProps) {
  return (
    <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Why Switch?</title>
        <link rel="stylesheet" href="/styles.css" />
      </head>

      <body f-client-nav class="dark:bg-black">
        <Partial name="body">
          <Component />
        </Partial>
      </body>
    </html>
  );
}
