/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        xs: "480px",
        sm: "640px",
        md: "768px",
        lg: "968px",
        xl: "1024px",
        "2xl": "1200px",
      },
      colors: {
        primaryColor: "#015AB8",
        darkColor: "#111827",
      },
      transitionDuration: {
        400: "0.4s",
      },
      animation: {
        slide: "slide 25s linear infinite",
      },
      keyframes: {
        slide: {
          "0%,100%": { transform: "translateX(5%)" },
          "50%": { transform: "translateX(-120%)" },
        },
      },
    },
  },
  plugins: [],
};
