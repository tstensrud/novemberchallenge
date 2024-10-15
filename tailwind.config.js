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
      "secondary-color": "#0E0D12",
      "tertiary-color": "#141318",
      "accent-color-main": "#EB6B44",
      "accent-color-secondary": "#7E67F6",
      "accent-color-secondary-faded": "#25203E"
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
  },
  plugins: [],
}