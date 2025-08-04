const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', ...defaultTheme.fontFamily.sans],
        fjalla: ['Fjalla One', ...defaultTheme.fontFamily.fjalla],
        lily: ['Lily Script One', ...defaultTheme.fontFamily.lily],
        baloo: ['"Baloo Bhai 2"', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
};