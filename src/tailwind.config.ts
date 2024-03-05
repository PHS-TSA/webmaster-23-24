import forms from "@tailwindcss/forms";
import typography from "@tailwindcss/typography";
import type { Config } from "tailwindcss";
// import headless from "@headlessui/tailwindcss";
import headless from "./utils/headless-tailwind.ts";

export default {
  content: ["{routes,islands,components}/**/*.{ts,tsx}"],
  plugins: [typography, forms, headless],
  theme: {
    extend: {
      gridTemplateColumns: {
        "footer-desktop": "1fr repeat(2, auto)",
        "footer-mobile": "1fr auto",
        "auto-2": "repeat(2,auto)",
      },
      gridTemplateRows: {
        "footer-mobile": "repeat(2, auto)",
        "footer-desktop": "1fr",
      },
    },
  },
  variants: {
    extend: {
      borderWidth: ["first"],
    },
  },
} satisfies Config;
