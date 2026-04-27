import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#050505",
          50: "#FAFAFA",
          100: "#F5F5F5",
          900: "#050505",
        },
        accent: {
          DEFAULT: "#2D5BFF",
          light: "#5B7FFF",
          dark: "#1F3FCC",
        },
        surface: {
          DEFAULT: "#111111",
          light: "#1A1A1A",
          dark: "#000000",
        },
        muted: {
          DEFAULT: "#A1A1AA",
          light: "#BFBFC4",
          dark: "#71717A",
        },
      },
      fontFamily: {
        display: ["PP Neue Montreal", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      fontSize: {
        "display-xl": "clamp(2.5rem, 8vw, 4.5rem)",
        "display-lg": "clamp(2rem, 6vw, 3.5rem)",
        "display-md": "clamp(1.5rem, 4vw, 2.5rem)",
        "heading-xl": "clamp(1.875rem, 5vw, 2.25rem)",
        "heading-lg": "clamp(1.5rem, 3vw, 1.875rem)",
        "heading-md": "clamp(1.25rem, 2.5vw, 1.5rem)",
        "body-lg": "clamp(1rem, 1.5vw, 1.125rem)",
        "body-md": "clamp(0.95rem, 1.25vw, 1rem)",
        "body-sm": "clamp(0.85rem, 1vw, 0.95rem)",
      },
      spacing: {
        section: "clamp(2rem, 8vw, 6rem)",
        container: "clamp(1rem, 5vw, 3rem)",
      },
      backdropBlur: {
        xs: "2px",
        sm: "4px",
      },
      animation: {
        pulse: "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      backgroundImage: {
        noise:
          'url(\'data:image/svg+xml,%3Csvg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"%3E%3Cfilter id="noiseFilter"%3E%3CfeTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" seed="2" /%3E%3C/filter%3E%3Crect width="100%25" height="100%25" filter="url(%23noiseFilter)" opacity="0.05"/%3E%3C/svg%3E\')',
      },
    },
  },
  plugins: [],
};

export default config;
