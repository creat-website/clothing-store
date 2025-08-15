/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-geist-sans)'],
        mono: ['var(--font-geist-mono)'],
      },
      colors: {
        school: {
          primary: '#4f46e5', // indigo-600
          secondary: '#c026d3', // fuchsia-600
        },
      },
    },
  },
  plugins: [],
  darkMode: 'media',
};