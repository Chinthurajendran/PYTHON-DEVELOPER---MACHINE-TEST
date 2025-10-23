/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],

  theme: {
    extend: {
        animation: {
    'bounce-slow': 'bounce 3s infinite',
  },
      fontFamily: {
        arvo: ["Arvo", "serif"],
      },
    },
  },
  plugins: [],
}
