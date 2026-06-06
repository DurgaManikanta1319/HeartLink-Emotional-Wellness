/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        pastel: {
          pink: {
            light: '#ffeef8',
            DEFAULT: '#ffd1dc',
            dark: '#ffb3c6',
          },
          purple: {
            light: '#e0d4f7',
            DEFAULT: '#c8b6e2',
            dark: '#b39ddb',
          },
          blue: {
            light: '#e0f4ff',
            DEFAULT: '#b8d4e3',
            dark: '#a8dadc',
          },
        },
      },
      fontFamily: {
        sans: ['Inter', 'Poppins', 'sans-serif'],
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        'glass': '0 8px 32px rgba(0, 0, 0, 0.1)',
        'glass-hover': '0 12px 48px rgba(0, 0, 0, 0.15)',
        'glow': '0 0 20px currentColor',
        'glow-lg': '0 0 30px currentColor',
      },
    },
  },
  plugins: [],
}
