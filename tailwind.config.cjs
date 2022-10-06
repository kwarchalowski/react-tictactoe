const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["Fira Code", ...defaultTheme.fontFamily.sans]
      }
    },
  },
  plugins: [],
}