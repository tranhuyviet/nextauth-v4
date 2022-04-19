module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontSize: {
        body: "15px",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
