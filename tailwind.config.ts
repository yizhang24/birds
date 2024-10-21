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
      }
    },
  },
  plugins: [],
};
export default config;
