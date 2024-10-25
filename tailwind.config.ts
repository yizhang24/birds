import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      'black': '#333',
    },
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        pink: "#F7D3D3",
        green: "#E4F0E6",
        purple: "#E2D8FA",
        yellow: "#FCE6A9",
      }
    },
  },
  plugins: [],
};
export default config;
