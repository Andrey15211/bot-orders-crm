import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#172033",
        canvas: "#f4f6f9",
        line: "#e3e8ef",
        primary: {
          50: "#eff6ff",
          100: "#dbeafe",
          500: "#3276e8",
          600: "#2463ca",
          700: "#1f51a5"
        }
      },
      boxShadow: {
        panel: "0 1px 2px rgba(16, 24, 40, 0.04), 0 8px 24px rgba(16, 24, 40, 0.04)"
      }
    },
  },
  plugins: [],
} satisfies Config;
