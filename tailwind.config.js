/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-blue': '#2563EB',
        'brand-blue-dark': '#1E40AF',
        'brand-green': '#16A34A',
        'brand-green-dark': '#166534',
        'brand-dark': '#0F172A',
        'brand-gray': '#F3F4F6',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
