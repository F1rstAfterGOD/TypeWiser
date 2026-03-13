/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["system-ui", "ui-sans-serif", "Inter", "sans-serif"]
      },
      colors: {
        background: "#050816",
        surface: "#0b1220",
        accent: {
          DEFAULT: "#38bdf8",
          soft: "#0ea5e9",
          strong: "#06b6d4"
        },
        danger: "#fb7185",
        success: "#4ade80",
        warning: "#facc15"
      },
      boxShadow: {
        "glow-soft": "0 0 40px rgba(56, 189, 248, 0.25)",
        "glow-strong": "0 0 70px rgba(6, 182, 212, 0.5)"
      },
      keyframes: {
        "pulse-soft": {
          "0%, 100%": { opacity: 0.6 },
          "50%": { opacity: 1 }
        },
        "float-slow": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-6px)" }
        },
        "caret-blink": {
          "0%, 49%": { opacity: 1 },
          "50%, 100%": { opacity: 0 }
        }
      },
      animation: {
        "pulse-soft": "pulse-soft 3s ease-in-out infinite",
        "float-slow": "float-slow 8s ease-in-out infinite",
        "caret-blink": "caret-blink 1s steps(2, start) infinite"
      }
    }
  },
  plugins: []
};
