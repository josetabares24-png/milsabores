import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'pastel': '#A8C5D9',      // Azul pastel de marca (color principal)
        'pastel-dark': '#7BA3BD', // Azul más oscuro para hover
        'pastel-light': '#D4E4EE', // Azul más claro para fondos
        'pastel-ink': '#3E6D8E',   // Mismo tono que pastel, oscuro para TEXTO (≥5:1 sobre blanco/crema, WCAG AA)
        'mango': '#F2B705',        // Amarillo (acento secundario)
        'sage': '#9FAF7F',         // Verde oliva de marca
        'sage-ink': '#606E45',     // Mismo tono que sage, oscuro para TEXTO (≥4.9:1, WCAG AA)
        'peach': '#F5D5C8',        // Melocotón de marca
        'steel': '#7FA1C3',
        'slate': '#5F6673',        // Antes #6B7280: oscurecido para ≥5.2:1 sobre crema (WCAG AA)
        'cream': '#FFF9F0',
      },
      fontFamily: {
        'quicksand': ['var(--font-quicksand)', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'slide-up': 'slideUp 0.8s ease-out',
        'slide-in': 'slideIn 0.6s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideIn: {
          '0%': { transform: 'translateX(-30px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
