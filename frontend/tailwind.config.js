import scrollbarHide from "tailwind-scrollbar-hide";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        robotoMono: ['"Roboto Mono"', "monospace"],
        rubik: ['"Rubik"', "sans-serif"],
      },
    },
  },
  plugins: [scrollbarHide], // Add the plugin to the tailwind config
};
