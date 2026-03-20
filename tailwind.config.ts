import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "afs-black": "#0A0A0A",
        "afs-gray-900": "#1A1A1A",
        "afs-gray-700": "#3D3D3D",
        "afs-gray-500": "#737373",
        "afs-gray-300": "#C2C2C2",
        "afs-gray-100": "#F0F0F0",
        "afs-gray-50": "#F8F8F8",
        "afs-white": "#FFFFFF",
        "afs-accent": "#0A0A0A",
        "afs-accent-inv": "#FFFFFF",
      },
      fontFamily: {
        display: ["'Instrument Serif'", "Georgia", "serif"],
        body: ["'Geist'", "system-ui", "sans-serif"],
      },
      borderRadius: {
        sm: "4px",
        md: "8px",
        lg: "12px",
        xl: "20px",
        full: "9999px",
      },
      boxShadow: {
        card: "0 1px 4px rgba(0,0,0,0.07)",
        float: "0 4px 20px rgba(0,0,0,0.10)",
        deep: "0 12px 48px rgba(0,0,0,0.14)",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-15px)" },
        },
      },
      animation: {
        "float-slow": "float 5s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
export default config;
