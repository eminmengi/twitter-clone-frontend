/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        xbg: "#000000",       // tam siyah
        xpanel: "#0f1419",    // panel arka plan
        xborder: "#2f3336",   // border
        xtext: "#e7e9ea",     // ana yazı
        xmuted: "#8b98a5",    // açıklama, placeholder
        xblue: "#1d9bf0",     // X mavisi
      },
      boxShadow: {
        xcard: "0 0 0 1px #2f3336",
      },
    },
  },
  plugins: [],
};
