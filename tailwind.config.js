/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        buzzkill: {
          // Deep Midnight Navy & Aerospace
          navy: '#07111E',
          navyDark: '#040912',
          navySurface: '#0B192C',
          navyCard: '#0E2238',
          navyCardHover: '#132C4A',
          navyBorder: 'rgba(0, 194, 255, 0.22)',
          navyBorderMuted: 'rgba(255, 255, 255, 0.08)',

          // High-Tech Accents
          primary: '#00C2FF',
          primaryHover: '#00A3D7',
          cyan: '#00C2FF',
          blue: '#1D4ED8',
          cobalt: '#2563EB',
          sky: '#38BDF8',
          glow: 'rgba(0, 194, 255, 0.35)',

          // Light High-Contrast Panels (Matching Slides 3, 4, 6, 7, 11, 15)
          lightBg: '#F8FAFC',
          lightSurface: '#FFFFFF',
          lightBorder: 'rgba(11, 25, 44, 0.12)',
          darkText: '#0B192C',
          darkTextMuted: '#475569',

          // Typography Colors
          textWhite: '#FFFFFF',
          textMuted: '#94A3B8',
          textIce: '#E2E8F0',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Outfit', 'Montserrat', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace']
      },
      keyframes: {
        radarSweep: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' }
        },
        pulseSlow: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.05)' }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' }
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' }
        }
      },
      animation: {
        'radar-sweep': 'radarSweep 4s linear infinite',
        'pulse-slow': 'pulseSlow 3s ease-in-out infinite',
        'float': 'float 5s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s infinite linear'
      }
    },
  },
  plugins: [],
}
