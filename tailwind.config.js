/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{php,html,js}"],
  theme: {
    extend: {
      keyframes: {
        fromLeft: {
          'from': {left: '-300px', opacity:"0"},
          'to': {left: '0', opacity: '1'}
        },
        toLeft: {
          'from': {left: '0', opacity: '1'},
          'to': {left:'-300px', opacity: '0'}
        },
        animation: {
          fromLeft: 'fromLeft 1s ease-in-out'
        },
      }
    },
  },
  plugins: [],
}