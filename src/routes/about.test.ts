import { type ServeHandlerInfo, createHandler } from "$fresh/server.ts";
import { assertStringIncludes } from "$std/assert/mod.ts";
import config from "../fresh.config.ts";
import manifest from "../fresh.gen.ts";

/**
 * Connection info for the request.
 */
const connInfo = {
  remoteAddr: { hostname: "127.0.0.1", port: 53496, transport: "tcp" },
} as const satisfies ServeHandlerInfo;

/*
  TODO(lishaduck): write a testing library for Fresh
  Plan:
  - fork `fresh_marionette`,
  - make it use Astral instead of Puppeteer, and
  - add in the useful functions from `fresh_testing_library`
    - Not including the parts from `testing-library`, of course.
    - Use Astral or Storybook for integration and unit tests, respectively.
      - Note that Storybook doesn't yet support Deno well.
*/
Deno.test("HTTP assert test.", async (t: Deno.TestContext): Promise<void> => {
  const handler = await createHandler(manifest, config);

  await t.step("#1 GET /about/", async (): Promise<void> => {
    const resp: Response = await handler(
      new Request("http://127.0.0.1/about/"),
      connInfo,
    );
    const text: string = await resp.text();
    assertStringIncludes(text, "It's us, man!");
  });
});
