import { type ServeHandlerInfo, createHandler } from "$fresh/server.ts";
import { assertStringIncludes } from "$std/assert/mod.ts";
import config from "../fresh.config.ts";
import manifest from "../fresh.gen.ts";

/**
 * Connection info for the request.
 */
const connInfo: ServeHandlerInfo = {
  remoteAddr: { hostname: "127.0.0.1", port: 53496, transport: "tcp" },
};

/**
 * Tests for the about page.
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
