/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          start: '#7c3aed',
          end: '#2563eb',
          50: '#f5f3ff',
          100: '#ede9fe',
          200: '#ddd6fe',
          300: '#c4b5fd',
          400: '#a78bfa',
          500: '#8b5cf6',
          600: '#7c3aed',
          700: '#6d28d9',
          800: '#5b21b6',
          900: '#4c1d95',
        },
        bg: {
          primary: '#0b1220',
          secondary: '#1e293b',
          card: '#ffffff',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        'soft': '0 2px 8px rgba(0, 0, 0, 0.08)',
        'soft-lg': '0 4px 16px rgba(0, 0, 0, 0.12)',
      },
      borderRadius: {
        'card': '16px',
        'btn': '8px',
      },
    },
  },
  plugins: [],
}
