/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        accent: 'hsl(var(--tw-accent) / <alpha-value>)',
      }
    }
  },
  plugins: [],
}
