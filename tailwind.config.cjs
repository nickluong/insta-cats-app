/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    // colors: {
    //   'tangerine': {
    //     100: '#FFE5D2',
    //     200: '#DCA7A3',
    //     300: '#E69580',
    //     400: '#FFA780',
    //     500: '#FF7C52',
    //   },
    // },
  },
  variants: {
    extend: {
      opacity: ['disabled'],
      cursor: ['disabled'],
    },
  },
  plugins: [ require('@tailwindcss/forms'),],
}
