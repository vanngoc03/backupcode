/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js}",
    './public/index.html'
  ],
  theme: {
    extend: {
      width: {
        '1100':'1100px'
      },
      backgroundColor: {
        primary: '#F5F5F5',
        secondary1: '#1266dd',
        secondary2: '#16C47F',
        secondary3: '#16C47F',
        'overlay-30': 'rgba(0,0,0,0.3)',
        'overlay-70': 'rgba(0,0,0,0.7)',
      },
      maxWidth: {
        '600':'600px',
        '1100':'1100px'
      },
      minWidth: {
        '200':'200px',
        '1100':'1100px'
      },
      cursor: {
        pointer: 'pointer'
      },
      flex: {
        '3': '3 3 0%'
      }
    },
  },
  plugins: [],
}
