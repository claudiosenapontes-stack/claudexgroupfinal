import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        charcoal: {
          DEFAULT: "#111111",
          elevated: "#1F2126",
          "elevated-2": "#2A2D33",
        },
        graphite: "#4A4F57",
        gold: {
          DEFAULT: "#FFC10A",
          hover: "#FFD24A",
          link: "#C99700",
          glow: "rgba(255,193,10,0.4)",
        },
        offwhite: {
          DEFAULT: "#F5F6F8",
          lightest: "#FAFAFB",
        },
        divider: "#E8E9EB",
      },
      fontFamily: {
        sans: ["var(--font-poppins)", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains)", "ui-monospace", "monospace"],
      },
      fontSize: {
        "display-xxl": ["clamp(64px, 11vw, 160px)", { lineHeight: "0.95", letterSpacing: "-0.035em", fontWeight: "600" }],
        "display-xl":  ["clamp(48px, 8vw, 104px)",  { lineHeight: "1.0",  letterSpacing: "-0.03em",  fontWeight: "600" }],
        "display-l":   ["clamp(40px, 5.5vw, 72px)", { lineHeight: "1.05", letterSpacing: "-0.025em", fontWeight: "600" }],
        "headline":    ["clamp(32px, 4vw, 48px)",   { lineHeight: "1.1",  letterSpacing: "-0.02em",  fontWeight: "600" }],
        "subhead":     ["clamp(22px, 2.4vw, 28px)", { lineHeight: "1.2",  letterSpacing: "-0.01em",  fontWeight: "500" }],
        "title":       ["20px",                     { lineHeight: "1.3",  letterSpacing: "-0.005em", fontWeight: "600" }],
        "body-l":      ["18px",                     { lineHeight: "1.6",  fontWeight: "400" }],
        "body":        ["16px",                     { lineHeight: "1.65", fontWeight: "400" }],
        "caption":     ["13px",                     { lineHeight: "1.4",  fontWeight: "500" }],
        "eyebrow":     ["12px",                     { lineHeight: "1.4",  letterSpacing: "0.22em", fontWeight: "600" }],
        "mono-data":   ["13px",                     { lineHeight: "1.3",  letterSpacing: "0.04em", fontWeight: "400" }],
      },
      backgroundImage: {
        "steel-fade": "linear-gradient(180deg, #111111 0%, #1F2126 100%)",
        "light-drift": "linear-gradient(180deg, #FFFFFF 0%, #F5F6F8 100%)",
        "gold-glow": "radial-gradient(circle, rgba(255,193,10,0.4) 0%, transparent 70%)",
      },
      animation: {
        "marquee": "marquee 38s linear infinite",
        "spin-slow": "spin 18s linear infinite",
        "pulse-gold": "pulseGold 2.4s cubic-bezier(.4,0,.6,1) infinite",
        "drift-particle": "driftParticle 4s linear infinite",
        "tick-bob": "tickBob 3s ease-in-out infinite",
      },
      keyframes: {
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        pulseGold: {
          "0%, 100%": { transform: "scale(1)", opacity: "1" },
          "50%": { transform: "scale(1.4)", opacity: "0.5" },
        },
        driftParticle: {
          from: { offsetDistance: "0%", opacity: "0" },
          "20%": { opacity: "1" },
          "80%": { opacity: "1" },
          to: { offsetDistance: "100%", opacity: "0" },
        },
        tickBob: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-1px)" },
        },
      },
      transitionTimingFunction: {
        "x-ease": "cubic-bezier(0.65, 0, 0.35, 1)",
      },
      maxWidth: {
        "content": "1440px",
      },
    },
  },
  plugins: [],
};

export default config;
