/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'header-pattern': "url('/assets/background/astronaut.jpg')",
      },
    },
  },
  plugins: [],
};
