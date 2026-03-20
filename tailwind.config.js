/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        arabic: ["'Amiri'", "serif"],
        display: ["'Playfair Display'", "serif"],
        body: ["'Lato'", "sans-serif"],
      },
      colors: {
        sage: {
          50: "#f2f7f2",
          100: "#e0ede0",
          200: "#c2dbc2",
          300: "#97c197",
          400: "#6aa36a",
          500: "#4a8a4a",
          600: "#3a6e3a",
          700: "#2d572d",
          800: "#264626",
          900: "#1f3a1f",
        },
        gold: {
          300: "#fde68a",
          400: "#fbbf24",
          500: "#f59e0b",
          600: "#d97706",
        },
        cream: {
          50: "#fdfaf4",
          100: "#faf3e0",
          200: "#f5e6c0",
        },
      },
      animation: {
        "fade-in-up": "fadeInUp 0.8s ease forwards",
        "fade-in": "fadeIn 1s ease forwards",
        float: "float 3s ease-in-out infinite",
        sparkle: "sparkle 2s ease-in-out infinite",
        "spin-slow": "spin 8s linear infinite",
        "bounce-slow": "bounce 2s infinite",
        lantern: "lanternSway 4s ease-in-out infinite",
      },
      keyframes: {
        fadeInUp: {
          "0%": { opacity: 0, transform: "translateY(30px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        sparkle: {
          "0%, 100%": { opacity: 1, transform: "scale(1)" },
          "50%": { opacity: 0.4, transform: "scale(0.8)" },
        },
        lanternSway: {
          "0%, 100%": { transform: "rotate(-6deg)" },
          "50%": { transform: "rotate(6deg)" },
        },
      },
    },
  },
  plugins: [],
};
