import { type ServeHandlerInfo, createHandler } from "$fresh/server.ts";
import { assertStringIncludes } from "$std/assert/mod.ts";
import config from "../fresh.config.ts";
import manifest from "../fresh.gen.ts";

const CONN_INFO: ServeHandlerInfo = {
  remoteAddr: { hostname: "127.0.0.1", port: 53496, transport: "tcp" },
};

Deno.test("HTTP assert test.", async (t): Promise<void> => {
  const handler = await createHandler(manifest, config);

  await t.step("#1 GET /about/", async (): Promise<void> => {
    const resp: Response = await handler(
      new Request("http://127.0.0.1/about/"),
      CONN_INFO,
    );
    const text: string = await resp.text();
    assertStringIncludes(text, "It's us, man!");
  });
});
