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
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
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

      neutral: colors.neutral,
      danger: colors.red,
      warning: colors.amber,
      info: colors.blue,
    },
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)", ...fontFamily.sans],
      },
      colors: {
        primary: {
          DEFAULT: "hsl(var(--clr-primary))",
          foreground: "hsl(var(--clr-primary-foreground))",
        },
        foreground: {
          DEFAULT: "hsl(var(--clr-foreground))",
          muted: "hsl(var(--clr-foreground-muted))",
        },
        background: "hsl(var(--clr-background))",
        element: "hsl(var(--clr-element))",
        input: "hsl(var(--clr-input))",
        scrollbar: "hsl(var(--clr-scrollbar))",
        accent: "hsla(var(--clr-accent))",
        border: "hsl(var(--clr-border))",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("tailwind-scrollbar")],
} satisfies Config;

export default config;
