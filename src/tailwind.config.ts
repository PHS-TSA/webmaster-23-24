import forms from "@tailwindcss/forms";
import typography from "@tailwindcss/typography";
import scrollbars from "tailwind-scrollbar";
import type { Config } from "tailwindcss";
import headless from "../vendor/@headlessui/tailwind/mod.ts";

export default {
  content: ["{routes,islands,components}/**/*.{ts,tsx}"],
  plugins: [typography, forms, scrollbars, headless],
  theme: {
    extend: {
      inset: {
        "3/5": "60%",
      },
    },
  },
  variants: {
    extend: {
      borderWidth: ["first"],
    },
  },
} satisfies Config;
