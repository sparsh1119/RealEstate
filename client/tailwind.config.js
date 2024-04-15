import { sign } from 'jsonwebtoken';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      listStyleImage: {
        checkmark: 'url("/img/checkmark.png")',
      },
      backgroundImage:{
        signImage : 'url("/src/assets/sign.jpg")',
        signInImage : 'url("/src/assets/signin.jpg")'
      }
    },
  },
  plugins: [],
}

