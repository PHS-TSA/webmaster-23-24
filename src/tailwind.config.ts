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
      gridTemplateColumns: {
        "footer-desktop": "1fr repeat(2, auto)",
        "footer-mobile": "1fr auto",
        "auto-2": "repeat(2,auto)",
      },
      gridTemplateRows: {
        "footer-mobile": "repeat(2, auto)",
        "footer-desktop": "1fr",
        "message-box": "1fr auto",
      },
    },
  },
  variants: {
    extend: {
      borderWidth: ["first"],
    },
  },
} satisfies Config;
