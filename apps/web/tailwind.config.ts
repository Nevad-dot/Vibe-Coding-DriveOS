import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: ["class", '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        // Dynamic Token Variables driven by system prefers-color-scheme & Figma tokens
        brand: {
          DEFAULT: "var(--bg-brand-solid)",
          hover: "var(--bg-brand-solid-hover)",
          text: "var(--text-brand)",
          light: "#EAF4EB",
        },
        textGray: {
          display: "var(--text-display)",
          primary: "var(--text-primary)",
          secondary: "var(--text-secondary)",
          tertiary: "var(--text-tertiary)",
          muted: "var(--text-muted)",
          placeholder: "var(--text-placeholder)",
        },
        surfaceLight: {
          canvas: "var(--bg-canvas)",
          pearl: "var(--bg-pearl)",
          card: "var(--bg-card)",
          border: "var(--border-secondary)",
          borderPrimary: "var(--border-primary)",
          divider: "var(--border-subtle)",
        },
      },
      fontFamily: {
        // Geist font family from /Font/Mode 1.tokens.json
        sans: [
          "'Geist'",
          "-apple-system",
          "BlinkMacSystemFont",
          '"SF Pro Text"',
          '"Inter"',
          "system-ui",
          "sans-serif",
        ],
        display: [
          "'Geist'",
          "-apple-system",
          "BlinkMacSystemFont",
          '"SF Pro Display"',
          '"Inter"',
          "system-ui",
          "sans-serif",
        ],
        text: [
          "'Geist'",
          "-apple-system",
          "BlinkMacSystemFont",
          '"Inter"',
          "system-ui",
          "sans-serif",
        ],
      },
      borderRadius: {
        xs: "5px",
        sm: "8px",
        md: "11px",
        lg: "12px",
        xl: "18px",
        pill: "9999px",
      },
      spacing: {
        xxs: "4px",
        xs: "8px",
        sm: "12px",
        md: "17px",
        lg: "24px",
        xl: "32px",
        xxl: "48px",
        section: "80px",
      },
    },
  },
  plugins: [],
};

export default config;
