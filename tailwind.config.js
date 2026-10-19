/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ivory: '#F7F5F0',
        charcoal: '#222521',
        olive: '#827254',
        gold: '#B69A70',
        overlay: 'rgba(0,0,0,0.35)',
      },
      fontFamily: {
        serif: ['Cormorant Garamond', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 20px 45px rgba(34, 37, 33, 0.08)',
      },
    },
  },
  plugins: [],
};
