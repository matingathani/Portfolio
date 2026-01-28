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
        accent3: "var(--color-accent-3)",
        accent4: "var(--color-accent-4)",
        accent5: "var(--color-accent-5)",
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
        card: "0 10px 30px rgba(26, 26, 46, 0.1)",
        "card-hover": "0 20px 40px rgba(255, 107, 157, 0.2)",
      },
      borderRadius: {
        card: "24px",
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
        cartoonBounce: {
          "0%": { transform: "scale(0)" },
          "50%": { transform: "scale(1.1)" },
          "100%": { transform: "scale(1)" },
        },
        wiggle: {
          "0%, 100%": { transform: "rotate(0deg)" },
          "25%": { transform: "rotate(-5deg)" },
          "75%": { transform: "rotate(5deg)" },
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
        cartoonBounce: "cartoonBounce 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)",
        wiggle: "wiggle 0.5s ease-in-out",
      },
    },
  },
  plugins: [],
};

export default config;
