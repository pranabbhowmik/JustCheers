/** @type {import('tailwindcss').Config} */
const tailwindScrollbarHide = require("tailwind-scrollbar-hide");
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
  plugins: [tailwindScrollbarHide],
};
