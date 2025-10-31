/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#6366F1",
        secondary: "#8B5CF6",
        accent: "#EC4899",
        success: "#10B981",
        warning: "#F59E0B",
        error: "#EF4444",
        info: "#3B82F6",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      animation: {
        'scale-in': 'scaleIn 0.2s ease-out',
        'confetti': 'confetti 0.5s ease-out',
        'bounce-in': 'bounceIn 0.3s ease-out',
      },
      keyframes: {
        scaleIn: {
          '0%': { transform: 'scale(0.8)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        confetti: {
          '0%': { transform: 'translateY(0) scale(0)', opacity: '1' },
          '50%': { transform: 'translateY(-20px) scale(1)', opacity: '1' },
          '100%': { transform: 'translateY(-40px) scale(0)', opacity: '0' },
        },
        bounceIn: {
          '0%': { transform: 'scale(0.3)', opacity: '0' },
          '50%': { transform: 'scale(1.05)', opacity: '1' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}