import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        legal: {
          charcoal: "#171717",
          black: "#0D0D0D",
          dark: "#121212",
          surface: "#1A1A1A",
          gold: {
            DEFAULT: "#B59A62",
            hover: "#A38850",
            light: "#D8C7A5",
            subtle: "#F4EFE6",
          },
          ivory: {
            DEFAULT: "#F8F6F1",
            light: "#FCFBF9",
            dark: "#EFECE4",
          },
          body: "#424242",
          muted: "#666666",
          border: "#E7E1D7",
          borderDark: "#262626",
        },
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Playfair Display", "Georgia", "serif"],
        sans: ["var(--font-sans)", "Inter", "system-ui", "-apple-system", "sans-serif"],
      },
      boxShadow: {
        subtle: "0 2px 10px rgba(0, 0, 0, 0.04)",
        card: "0 4px 20px rgba(0, 0, 0, 0.06)",
        elevated: "0 10px 30px rgba(0, 0, 0, 0.08)",
      },
    },
  },
  plugins: [],
};

export default config;
