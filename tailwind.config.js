/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          background: '#0a0025',
          font1: '#ffffff',
          font2: '#b745e0',
          font3: 'darkred',
          font4: '#cf1414',
        },
      },
      fontFamily: {
        oswald: ['Oswald', 'sans-serif'],
        roboto: ['Roboto', 'sans-serif'],
        'tilt-neon': ['Tilt Neon', 'cursive'],
      },
      animation: {
        reverse: 'reverse 1s linear infinite',
      },
      keyframes: {
        reverse: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(-360deg)' },
        },
      },
    },
  },
  plugins: [],
};
