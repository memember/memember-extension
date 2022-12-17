/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.html',
    './src/**/*.vue',
    './src/**/*.ts',
  ],
  theme: {
    extend: {
      colors: {
        'dark-blue': '#0f172a',
      },
    },
  },
  plugins: [],
}
