import tailwind from "$fresh/plugins/tailwind.ts";
import { defineConfig } from "$fresh/server.ts";

export default defineConfig({
  plugins: [
    tailwind(),
  ],
  build: {
    target: [
      "es2022", // Latest JS features
      "chrome120", // Latest Chrome version (120)
      "firefox120", // Latest Chrome version (120)
      "edge120", // Latest Chrome version (120)
      "safari17", // Latest Chrome version (17)
    ],
  },
  router: {
    trailingSlash: true,
  },
});
