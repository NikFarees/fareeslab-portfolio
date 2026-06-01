import type { Config } from "tailwindcss";

/**
 * Design tokens live here — edit these to re-theme the whole site.
 * Accent is a warm orange.
 */
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./data/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: "#F4F0E6",
        surface: "#FAF7F0",
        ink: {
          DEFAULT: "#1B1A18",
          soft: "#6C6962",
        },
        line: {
          DEFAULT: "#E5DDD0",
          strong: "#D6CCBA",
        },
        accent: {
          DEFAULT: "#CC6B4D",
          dark: "#B35A3A",
          wash: "#F7EDE5",
        },
      },
      fontFamily: {
        sans: ["var(--font-dm-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-fraunces)", "Georgia", "serif"],
        mono: ["var(--font-geist-mono)", "ui-monospace", "monospace"],
      },
      maxWidth: {
        content: "1120px",
      },
      boxShadow: {
        card: "0 26px 50px -26px rgba(28,27,24,0.32)",
        primary: "0 6px 18px -6px rgba(204,107,77,0.6)",
        term: "0 24px 60px -22px rgba(28,27,24,0.5)",
      },
    },
  },
  plugins: [],
};

export default config;
