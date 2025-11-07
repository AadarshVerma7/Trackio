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

// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      keyframes: {
        "gradient-flow": {
          "0%": { "background-position": "200% 200%" },
          "100%": { "background-position": "-200% -200%" },
        },
      },
      animation: {
        "gradient-flow": "gradient-flow 0.2s linear infinite",
      },
    },
  },
};

