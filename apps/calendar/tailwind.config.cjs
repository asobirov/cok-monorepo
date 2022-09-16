/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
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
      screens: {
        DEFAULT: '26rem',
        sm: '38rem',
        md: '45rem',
        lg: '60rem',
      }
    },
    extend: {
      colors: {
        primary: {
          dark: "#111",
          light: "#f5f5f7",
        },
        blackAlpha: {
          50: "rgba(0, 0, 0, 0.04)",
          100: "rgba(0, 0, 0, 0.06)",
          200: "rgba(0, 0, 0, 0.08)",
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
      },
      backgroundImage: {
        'striped-disabled': "repeating-linear-gradient(345deg, transparent, transparent 8px, rgba(255, 255, 255, 0.04) 8px, rgba(255, 255, 255, 0.04) 16px)"
      }
    },
    plugins: [],
  }
}
