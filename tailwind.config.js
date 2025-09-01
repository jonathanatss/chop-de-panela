/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'beer-gold': '#fbb_f24', // Um dourado vibrante como chopp
        'beer-amber': '#f59e0b', // Um tom âmbar mais profundo
        'dark-wood': '#3f3f46',   // Um cinza escuro que remete a madeira
        'light-foam': '#fefce8',  // Um branco-creme como espuma de chopp
      },
      fontFamily: {
        // Opcional: Adiciona uma fonte com mais personalidade
        sans: ['"Inter"', 'sans-serif'],
        display: ['"Lilita One"', 'cursive'], // Fonte divertida para títulos
      }
    },
  },
  plugins: [],
};
