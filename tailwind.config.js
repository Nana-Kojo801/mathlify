/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,svelte,ts}"],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      boxShadow: {
        "base": "0 0 5px 1px lightgray"
      },
      gridTemplateColumns: {
        "top-players-grid": "repeat(10, minmax(120px, 200px))",
        "large-top-players-grid": "repeat(10, minmax(170px, 200px))",
        "level-grid": "repeat(auto-fill, 70px)",
        "difficulty-grid": "repeat(auto-fill, minmax(100px, 110px))"
      },
    },
  },
  plugins: [],
}

