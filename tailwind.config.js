/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      "primary-color": "#FEFEFE",
      "primary-color-faded": "#9C9DA2",
      "secondary-color": "#121212",
      "tertiary-color": "#1E1E1E",
      "accent-color-main": "#EB6B44",
      "accent-color-secondary": "#7E67F6",
      "accent-color-secondary-faded": "#37305c"
    },
    extend: {
      fontFamily: {
        sans: [
          "-apple-system",
          "Inter",
          "system-ui",
          "BlinkMacSystemFont",
          '"Segoe UI"',
          '"Helvetica Neue"',
          "Arial",
          '"Noto Sans"',
          "sans-serif",
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
          '"Noto Color Emoji"'
        ]
      }
    },
    keyframes : {
      slider: {
        '0%': {left: '-30%'},
        '50%': {let: '50%'},
        '100%': {left: '100%'}
      },
      spin: {
        '0%': {transform: 'rotate(0deg)'},
        '100%': {transform: 'rotate(360deg)'}
      }
    },
    animation: {
      slider: 'slider 3.0s linear infinite',
      spin: 'spin 1s linear infinite'
    }
  },
  plugins: [],
}