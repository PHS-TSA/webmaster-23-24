#!/usr/bin/env -S deno run --env -A --watch=static/

import { Builder } from "fresh/dev";
import { tailwind } from "@fresh/plugin-tailwind";
import { app } from "./main.ts";

// Pass development only configuration here
const builder = new Builder({
  target: [
    "es2022", // Latest JS features
    "chrome120", // Latest Chrome version (120)
    "firefox120", // Latest Firefox version (120)
    "edge120", // Latest Edge version (120)
    "safari17", // Latest Safari version (17)
  ],
});

// Example: Enabling the tailwind plugin for Fresh
tailwind(builder, app, {});

// Create optimized assets for the browser when
// running `deno run -A dev.ts build`
if (Deno.args.includes("build")) {
  await builder.build(app);
} else {
  // ...otherwise start the development server
  await builder.listen(app);
}
