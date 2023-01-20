/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        tangerine: {
          100: "#FFE5D2",
          200: "#DCA7A3",
          300: "#E69580",
          400: "#FFA780",
          500: "#F27F0C",
        },
        summer: {
          100: "#FC7128",
          200: "#FD9319",
          300: "#FECD5A",
          400: "#07B1BC",
          500: "#2B8180",
        },
        "neon-orange": "#FF5F1F",
        "neon-purple": "#6C47FF",
        cranberry: "#DA4B78",
        gorse: "#FFDE3E",
        riptide: "#86E3CE",
        perfume: "#CCABD8",
        garfield:"#FF8604",
      },
    },
  },
  variants: {
    extend: {
      opacity: ["disabled"],
      cursor: ["disabled"],
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
