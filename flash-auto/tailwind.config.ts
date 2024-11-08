import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: 'class',
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
        blueberry: '#6B7A8F',
        applecore: '#DCC7AA',
        softbeige: '#FAF8F5',
        bluetint: '#F0F4F8',
        lightcream: '#FFFACC',
        lavender: '#F7F3FC',
        darkergray: ' #F0F0F0'
      },
    },
  },
  plugins: [],
};
export default config;
