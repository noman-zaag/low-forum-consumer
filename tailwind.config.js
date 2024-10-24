/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "#248280",
        secondary: "",
        text_primary: "",
        text_secondary: "#4A4A4A ",
        background1: "#F3F4F5",
      },
      screens: {},
    },
    screens: {
      // => @media (min-width: 640px) { ... }
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1440px",
      "2xl": "1536px",
    },
    container: {
      screens: { sm: "640px", md: "768px", lg: "1024px", xl: "1440px", "2xl": "1536px" },
      padding: {
        DEFAULT: "1rem",
        sm: "2rem",
        lg: "0px",
        xl: "120px",
        "2xl": "0px",
      },
      center: true,
    },
  },
  plugins: [],
};
