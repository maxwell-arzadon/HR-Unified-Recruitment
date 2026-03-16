/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      screens: {
        "2xl": "1440px",
      },
      maxWidth: {
        content: "1280px",
      },
    },
  },
  theme: {
    extend: {
      colors: {
        primary: "#FF4545",
        accent: "#F17F33",
        plum: "#1C0B21",
        muted: "#897F8E",
        black: "#241E27",
        white: "#FCFCFD",
        success: "#16A34A",
        info: "#2563EB",
        gray: "#9F96A5",
        bg: "#FBF9FC",
        border: "#F2EFF4",
      },
      backgroundImage: {
        "brand-gradient": "linear-gradient(90deg, #F13338, #F17F33)",
      },
      fontFamily: {
        jakarta: ["Plus Jakarta Sans", "sans-serif"],
        dm: ["DM Sans", "sans-serif"],
      },
    },
  },
  plugins: [],
};
