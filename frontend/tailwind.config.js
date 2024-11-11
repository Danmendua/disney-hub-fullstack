/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "media",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        "size-1450": "1450px",
        "size-1086": "1086px",
        "max-687": { max: "687px" },
        "size-470": "470px",
        "min-688": { min: "688px" },
        "size-1600": "1600px",
        "between-1250-1600": { min: "1250px", max: "1600px" },
        "between-1086-1250": { min: "1086px", max: "1250px" },
        "max-1086": { max: "1086px" },
        "min-1086": { min: "1086px" },
      },
      colors: {
        "custom-blue": "#040714",
      },
      backgroundImage: {
        "disney-background": "url('/src/assets/images/background.png')",
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
