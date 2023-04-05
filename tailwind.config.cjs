/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,tsx,jsx}',
  ],
  theme: {
    extend: {
      width: {
        39: '9.75rem',
      },
      height: {
        58: '14.5rem',
        66: '16.5rem',
      },
    },
  },
  plugins: [],
}
