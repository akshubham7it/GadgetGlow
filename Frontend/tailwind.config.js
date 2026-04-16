module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        euclid: ['"Euclid Circular A"', 'sans-serif'],
      },
    },
  },
  plugins: [],
  safelist: [
    'bg-black',
    'bg-gray',
    'bg-orange',
    'bg-white',
    'bg-blue',
    'bg-green',
  ],
};
