/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#12181B",
          soft: "#1B2327",
          line: "#2A3438",
        },
        parchment: {
          DEFAULT: "#F6F2E8",
          dim: "#EDE7D6",
        },
        wheat: {
          DEFAULT: "#C9A227",
          soft: "#E2C363",
        },
        moss: {
          DEFAULT: "#3F6B4A",
          deep: "#2A4A33",
        },
        clay: "#B5603A",
      },
      fontFamily: {
        display: ["Fraunces", "serif"],
        body: ["Inter", "sans-serif"],
        mono: ["IBM Plex Mono", "monospace"],
      },
      backgroundImage: {
        "grain": "radial-gradient(circle at 1px 1px, rgba(246,242,232,0.06) 1px, transparent 0)",
      },
      boxShadow: {
        card: "0 1px 0 rgba(201,162,39,0.15), 0 12px 30px -12px rgba(0,0,0,0.5)",
      },
    },
  },
  plugins: [],
};
