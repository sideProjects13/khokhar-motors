/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Clean, Professional Color Palette
        primary: "#2563eb",      // Professional Blue - Trustworthy & Clean
        secondary: "#1e293b",    // Deep Navy - Professional & Strong
        accent: "#f59e0b",       // Warm Amber - Attention & Energy
        light: "#f8fafc",        // Clean White Background
        dark: "#0f172a",         // Rich Dark Blue
        success: "#059669",      // Emerald Green - Success & Growth
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        inter: ["Inter", "sans-serif"],
        urbanist: ["Urbanist", "sans-serif"],
      },
      animation: {
        glow: "glow 2s ease-in-out infinite",
        fadeIn: "fadeIn 0.8s ease-in",
        slideUp: "slideUp 0.6s ease-out",
        bounceIn: "bounceIn 0.8s ease-out",
      },
      keyframes: {
        glow: {
          "0%, 100%": { boxShadow: "0 0 5px rgba(37, 99, 235, 0.3)" },
          "50%": { boxShadow: "0 0 20px rgba(37, 99, 235, 0.5)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(30px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        bounceIn: {
          "0%": { transform: "scale(0.3)", opacity: "0" },
          "50%": { transform: "scale(1.05)", opacity: "0.8" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'service-gradient': 'linear-gradient(135deg, #2563eb 0%, #1e293b 100%)',
      },
    },
  },
  plugins: [],
};