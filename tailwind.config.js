/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
colors: {
        primary: "#0066FF",
        secondary: "#00D4FF", 
        accent: "#FF6B00",
        success: "#00C851",
        warning: "#FFB300",
        error: "#FF3B30",
        info: "#2196F3",
        playstation: {
          blue: "#003791",
          lightblue: "#0070D1",
          black: "#000000",
          darkgray: "#1a1a1a"
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'qr-generate': 'qr-generate 0.3s ease-out',
        'success-flash': 'success-flash 0.5s ease-out',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        'qr-generate': {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        'success-flash': {
          '0%': { backgroundColor: '#00C851' },
          '50%': { backgroundColor: '#00E853' },
          '100%': { backgroundColor: '#00C851' },
        },
        'shimmer': {
          '0%': { backgroundPosition: '-200px 0' },
          '100%': { backgroundPosition: 'calc(200px + 100%) 0' },
        },
      },
    },
  },
  plugins: [],
}