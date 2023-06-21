/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './node_modules/flowbite-react/**/*.js',
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        roboto: ['Roboto', 'sans-serif'],
      },
      boxShadow: {
        custom: '0 0 0 2px #00875F',
      },
      colors: {
        transparent: 'transparent',
        white: '#fff',
        gray: {
          100: '#E1E1E6',
          300: '#C4C4CC',
          800: '#202024',
          900: '#121214',
        },
        green: {
          300: '#00B37E',
          500: '#00875F',
        },
      },
    },
  },
}
