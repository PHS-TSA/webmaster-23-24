#!/usr/bin/env -S deno run --env -A --watch=static/

import dev from "$fresh/dev.ts";
import config from "./fresh.config.ts";

await dev(import.meta.url, "./main.ts", config);
