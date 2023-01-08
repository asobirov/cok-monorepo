/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  plugins: [
    require("@tailwindcss/line-clamp"),
  ],
  darkMode: "class",
  theme: {
    screens: {
      sm: '30em',
      md: '48em',
      lg: '62em',
      xl: '80em',
      '2xl': '96em',
    },
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        md: '1rem',
        lg: '1.25rem',
      },
    },
    extend: {
      colors: {
        primary: {
          dark: "#111",
          light: "#f5f5f7",
        },
        transparent: {
          black: "rgba(0, 0, 0, 0)",
          white: "rgba(255, 255, 255, 0)",
        },
        blackAlpha: {
          50: "rgba(0, 0, 0, 0.04)",
          100: "rgba(0, 0, 0, 0.06)",
          200: "rgba(0, 0, 0, 0.08)",
          250: 'rgba(0, 0, 0, 0.12)',
          300: "rgba(0, 0, 0, 0.16)",
          400: "rgba(0, 0, 0, 0.24)",
          500: "rgba(0, 0, 0, 0.36)",
          600: "rgba(0, 0, 0, 0.48)",
          700: "rgba(0, 0, 0, 0.64)",
          800: "rgba(0, 0, 0, 0.80)",
          900: "rgba(0, 0, 0, 0.92)",
        },
        whiteAlpha: {
          50: "rgba(255, 255, 255, 0.04)",
          100: "rgba(255, 255, 255, 0.06)",
          200: "rgba(255, 255, 255, 0.08)",
          250: 'rgba(255, 255, 255, 0.12)',
          300: "rgba(255, 255, 255, 0.16)",
          400: "rgba(255, 255, 255, 0.24)",
          500: "rgba(255, 255, 255, 0.36)",
          600: "rgba(255, 255, 255, 0.48)",
          700: "rgba(255, 255, 255, 0.64)",
          800: "rgba(255, 255, 255, 0.80)",
          900: "rgba(255, 255, 255, 0.92)",
        }
      },
      boxShadow: {
        'header': 'inset 0 0 0 1px rgba(0,0,0,0.01), 0 4px 6px 0px rgba(0, 0, 0, 0.2)',
        'box-main': "5px 5px 25px -15px rgba(0, 0, 0, 0.1)",
        'box-main-dark': "0 2px 15px -2px rgba(0, 0, 0, 0.7)",
      },
      borderRadius: {
        '4xl': '2rem',
      }
    },
    plugins: [],
  }
}
