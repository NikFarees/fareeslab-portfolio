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
        paper: "#FAFAF7",
        surface: "#FFFFFF",
        ink: {
          DEFAULT: "#1B1A18",
          soft: "#6C6962",
        },
        line: {
          DEFAULT: "#ECE9E1",
          strong: "#E2DED4",
        },
        accent: {
          DEFAULT: "#D97757",
          dark: "#C25C3D",
          wash: "#FBF1EC",
        },
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "ui-monospace", "monospace"],
      },
      maxWidth: {
        content: "1120px",
      },
      boxShadow: {
        card: "0 26px 50px -26px rgba(28,27,24,0.32)",
        primary: "0 6px 18px -6px rgba(217,119,87,0.6)",
        term: "0 24px 60px -22px rgba(28,27,24,0.5)",
      },
    },
  },
  plugins: [],
};

export default config;
