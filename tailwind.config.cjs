import "@fontsource/fira-code";

const defaultTheme = require("tailwindcss/defaultTheme");

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