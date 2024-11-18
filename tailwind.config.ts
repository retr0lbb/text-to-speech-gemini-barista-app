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
        background: "var(--background)",
        foreground: "var(--foreground)",
        twinkyBrown: "#3b3026",
        femboyOrange: "#f2bc1d",
        goddamBlue: "#0339d9",
        whiteDickColor: "#ece1b2",
        blackDickColor: "#3b3026"
      },
      animation: {
        bounceFast: "bounce 400ms linear infinite",
        bounceMedium: "bounce 410ms linear infinite",
        bounceSlow: "bounce 420ms linear infinite"
      }
    },
  },
  plugins: [],
};
export default config;
