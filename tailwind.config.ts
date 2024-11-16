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
