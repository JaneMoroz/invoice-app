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
      boxShadow: {
        customShadow: "var(--customShadow)",
        modalShadow: "var(--modalShadow)",
      },
      colors: {
        background: "var(--background)",
        nav: "var(--nav)",
        modal: "var(--modal)",

        primary: "var(--primary)",
        secondary: "var(--secondary)",
        blueishGrey: "var(--blueishGrey)",
        lightBlueishGrey: "var(--lightBlueishGrey)",
        darkGrey: "var(--darkGrey)",

        themeToggler: "var(--themeToggler)",
        popupBg: "var(--popupBg)",

        // Button
        baseBg: "var(--baseBg)",
        baseBgHover: "var(--baseBgHover)",
        defaultBg: "var(--defaultBg)",
        defaultHoverBg: "var(--defaultHoverBg)",
        grey: "var(--grey)",
        greyHover: "var(--greyHover)",
      },
    },
  },
  plugins: [],
};
