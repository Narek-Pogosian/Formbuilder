import type { Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";
import colors from "tailwindcss/colors";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1rem",
      screens: {
        xl: "1200px",
      },
    },
    borderRadius: {
      sm: "calc(var(--radius) - 2px)",
      DEFAULT: "var(--radius)",
      md: "calc(var(--radius) + 2px)",
      full: "999px",
      none: "0px",
    },
    colors: {
      transparent: colors.transparent,
      current: colors.current,
      black: colors.black,
      white: colors.white,
      neutral: colors.zinc,
      red: colors.red,
      amber: colors.amber,
      blue: colors.blue,
    },
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)", ...fontFamily.sans],
      },
      colors: {
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        foreground: {
          DEFAULT: "hsl(var(--foreground))",
          muted: "hsl(var(--foreground-muted))",
        },
        background: {
          DEFAULT: "hsl(var(--background))",
          popover: "hsl(var(--background-popover))",
          input: "hsl(var(--background-input))",
          card: "hsl(var(--background-card))",
        },
        accent: "hsla(var(--accent))",
        border: "hsl(var(--border))",
        scrollbar: "hsl(var(--scrollbar))",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require("tailwind-scrollbar"),
    require("@tailwindcss/container-queries"),
  ],
} satisfies Config;

export default config;
