import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        cream: '#FAF9F6',
        gold: {
          DEFAULT: '#D4AF37',
          dark: '#926239',
        },
        brown: {
          DEFAULT: '#4A3728',
          dark: '#2D1E12',
        },
        beige: {
          DEFAULT: '#EADDCA',
          light: '#F5EFE6',
        },
        taupe: {
          DEFAULT: '#8B735B',
          light: '#B09B82',
        },
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'sans-serif'],
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease-out forwards',
        'pulse-gold': 'pulse-gold 2s ease-in-out infinite',
        'slide-in': 'slideIn 0.4s ease-out forwards',
        'slide-out': 'slideOut 0.4s ease-out forwards',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'pulse-gold': {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(212, 175, 55, 0.4)' },
          '50%': { boxShadow: '0 0 20px 5px rgba(212, 175, 55, 0.2)' },
        },
        slideIn: {
          '0%': { opacity: '0', transform: 'translateX(100px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideOut: {
          '0%': { opacity: '1', transform: 'translateX(0)' },
          '100%': { opacity: '0', transform: 'translateX(100px)' },
        },
      },
    },
  },
  plugins: [],
}

export default config
