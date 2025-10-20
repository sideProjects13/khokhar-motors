/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#DC2626", // Professional red for trust and urgency
        secondary: "#1E293B", // Sophisticated dark blue
        accent: "#F59E0B", // Amber for highlights and CTAs
        light: "#F8FAFC", // Clean light background
        dark: "#0F172A", // Deep dark for contrast
        success: "#10B981", // Green for positive elements
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
          "0%, 100%": { boxShadow: "0 0 5px #DC2626" },
          "50%": { boxShadow: "0 0 20px #DC2626" },
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
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "service-gradient": "linear-gradient(135deg, #DC2626 0%, #1E293B 100%)",
      },
    },
  },
  plugins: [],
};
