/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        cream: '#F5F0E8',
        ink: '#0D0D0D',
        saffron: '#FF6B00',
        orange: '#FF6B00',
        'orange-light': '#FF8C33',
        'orange-dim': 'rgba(255,107,0,0.15)',
      },
      fontFamily: {
        display: ['Syne', 'sans-serif'],
        hero: ['Bebas Neue', 'sans-serif'],
        body: ['Space Grotesk', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      keyframes: {
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        pulseOrange: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(255,107,0,0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(255,107,0,0.6)' },
        },
        frameFloat: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '33%': { transform: 'translateY(-8px) rotate(0.5deg)' },
          '66%': { transform: 'translateY(-4px) rotate(-0.5deg)' },
        },
      },
      animation: {
        floatSlow: 'floatSlow 6s ease-in-out infinite',
        pulseOrange: 'pulseOrange 3s ease-in-out infinite',
        frameFloat: 'frameFloat 6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
