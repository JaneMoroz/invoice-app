/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        nav: "var(--nav)",
        primary: "var(--primary)",
        secondary: "var(--secondary)",
        themeToggler: "var(--themeToggler)",
        popupBg: "var(--popupBg)",
      },
    },
  },
  plugins: [],
};
