import type { Config } from "tailwindcss";
import { nextui } from "@nextui-org/theme";
import { FontFamily } from "./components/reading/tools/Fontfamily";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "auth-image": "url('/images/authimage.png')",
      },
      uploadButton: {
        "upload-image": "url('/images/upload.png')",
      },
      colors: {
        "blue-lovely": "#1849D6",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        roboto: ["Roboto", "sans - serif"],
        robotoslab: ["Roboto Slab", "serif"],
        robotoflex: ["Roboto Flex", "sans - serif"],
        inter: ["Inter", "sans - serif"],
        itim: ["Itim", "cursive"],
        georgia: ["Georgia", "serif"], 
        verdana: ["Verdana", "sans-serif"],
      }, 
      typography: {
        DEFAULT: {
          css: {
            fontSize: 'inherit',
            lineHeight: 'inherit',
            fontFamily: 'inherit',
            maxWidth: 'none', 
          },
        },
      },
    },
    screens: {
      mobile: {
        min: "100px",
        max: "550px",
      },
      tablet: {
        min: "550px",
        max: "750px",
      },
      "mini-laptop": {
        min: "750px",
        max: "874px",
      },
      laptop: {
        min: "874px",
        max: "1280px",
      },
      desktop: {
        min: "1280px",
      },
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
  },
  darkMode: "class",
  plugins: [require('@tailwindcss/typography'),nextui()],
};
export default config;