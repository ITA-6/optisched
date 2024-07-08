/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        sm: "480px",
        md: "768px",
        lg: "976px",
        xl: "1440px",
      },
      colors: {
        white: "#FFFFFF",
        "white-grayish": "#E9E9E9",
        grayish: "#B0B0B0",
        cyan: "#C2F4DD",
        green: "#198754",
        "light-green": "#4BDE9A",
        "dark-green": "#03703D",
        "very-dark-green": "#20642B",
      },
      fontFamily: {
        noto: ["Noto Sans", "sans-serif"],
        inter: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};
