/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
   theme: {
    extend: {
      colors: {
        'navbar-color': '#1E38A3',
      },
      fontFamily: {
        'cairo': ["Cairo", 'sans-serif'],
      },
      screens: {
        'lg-1050': '1050px',
      },
    },
  },
  plugins: [],
}

