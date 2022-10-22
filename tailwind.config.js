module.exports = {
  content: [
    "./pages/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./redux/**/*.{js,ts,jsx,tsx}",
  ],

  darkMode: "media",
  variants: {
    color: ["responsive", "hover", "focus", "group-hover"],
    borderColor: ["responsive", "hover", "focus", "group-hover"],
  },
  theme: {
    screens : {
      'md':'768px',
      'lg':'1024px',
      'xl':'1280px',
       '2xl':'1760px',
      '3xl':'1900px',
    },
    extend: {
      colors: {
        background: "#060606",
        nav:"#111",
        notactive: "#8d8f94",
      },
      width: {
        player: "1024px",
      },
      border: ["hover"],
    },
  },

  variants: {
    extend: {},
    aspectRatio: ["responsive", "hover"],
  },
  plugins: [require("@tailwindcss/aspect-ratio")],
};
