/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      xs: "300px",
      sm: "420px",
      md: "768px",
      lg: "950px",
      xl: "1200px",
      "2xl": "1440px",
    },
    extend: {},
  },
  plugins: [],
};
