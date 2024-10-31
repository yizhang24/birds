import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      'black': '#333',
    },
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        pink: "var(--pink)",
        green: "var(--green)",
        purple: "var(--purple)",
        yellow: "var(--yellow)",
      }
    },
  },
  plugins: [],
};
export default config;
