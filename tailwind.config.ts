import type { Config } from "tailwindcss";

export default {
  content: [
    "./modules/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        textColors: {
          primary: "#1e293b",
          secodary: "#64748B",
          label: "#E2E8F0",
          link: "#338FD1",
        },
        bgColors: {
          header: "#252630",
          sidebar: "#1E1F27",
        },
        error: "#DC2626",
        success: "green",
      },
    },
  },
  plugins: [],
} satisfies Config;
