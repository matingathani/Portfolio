import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--color-bg)",
        surface: "var(--color-surface)",
        primary: "var(--color-primary)",
        secondary: "var(--color-secondary)",
        muted: "var(--color-muted)",
        accent: "var(--color-accent)",
        accent2: "var(--color-accent-2)",
        border: "var(--color-border)",
      },
      fontFamily: {
        heading: ["var(--font-heading)", "Space Grotesk", "Inter", "system-ui", "sans-serif"],
        body: ["var(--font-body)", "Inter", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "JetBrains Mono", "ui-monospace", "SFMono-Regular"],
      },
      maxWidth: {
        content: "72rem",
      },
      boxShadow: {
        card: "0 18px 40px rgba(15, 23, 42, 0.35)",
      },
      borderRadius: {
        card: "16px",
      },
      backgroundImage: {
        "pixel-grid": "radial-gradient(rgba(255,255,255,0.06) 1px, transparent 1px)",
        "soft-radial": "radial-gradient(circle at top, rgba(59,130,246,0.22), transparent 55%)",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        pulseSoft: {
          "0%, 100%": { opacity: "0.4", transform: "scale(1)" },
          "50%": { opacity: "0.9", transform: "scale(1.15)" },
        },
        scan: {
          "0%": { backgroundPosition: "0 0" },
          "100%": { backgroundPosition: "0 100%" },
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        pulseSoft: "pulseSoft 2.6s ease-in-out infinite",
        scan: "scan 9s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
