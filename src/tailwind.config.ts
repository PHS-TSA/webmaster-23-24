import typography from "@tailwindcss/typography";
import type { Config } from "tailwindcss";

export default {
  content: ["{routes,islands,components}/**/*.{ts,tsx}"],
  plugins: [typography],
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
} satisfies Config;
