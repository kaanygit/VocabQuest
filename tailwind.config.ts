/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors:{
        "blue-1":"#5e77f4",
        "blue-2":"#4460f3",
        "typography-text":"#c4c7c5",
        'dark-color-1':'#222831',
        "dark-1":"#000000",
        "dark-2":"#141414",
        "dark-3":"#282828",
        "dark-4":"#230046",
        "dark-5":"#320064",
        "sectionColor":"#f6f7f7"
      }
    },
  },
  plugins: [],
}