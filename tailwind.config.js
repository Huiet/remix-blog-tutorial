/** @type {import('tailwindcss').Config} */

const colors = require('tailwindcss/colors')


module.exports = {
  content: ["./app/**/*.{ts,tsx,jsx,js}"],
  plugins: [require('daisyui')],
  theme: {
    extend: {
      colors: {
        primaryLight: '#fc9257',
        secondaryLight: '#57c2fc',
        backgroundLight: '#363537',
        textLight: '#363537',
        bodyLight: '#FFF',
        primaryHoverLight: '#fdb088',
        secondaryHoverLight: '#85d3fe',

        primaryDark:  '#fc5770',
        secondaryDark: '#fce357',
        backgroundDark: '#121212',
        textDark: '#FAFAFA',
        bodyDark: '#363537',
        primaryHoverDark: '#ffc6d3',
        secondaryHoverDark: '#fdee9b',
      },
      animation: {
        e1: 'ellipses1 .6s infinite',
        e2: 'ellipses2 .6s infinite',
        e3: 'ellipses3 .6s infinite',
      },
      keyframes: {
        ellipses1: {
          '0%': { transform: 'scale(0)' },
          '100%': { transform: 'scale(1)' }
        },
        ellipses2: {
          '0%': { transform: 'translate(0, 0)' },
          '100%': { transform: 'translate(24px, 0)' }
        },
        ellipses3: {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(0)' }
        }
      }
    },
  },
};
