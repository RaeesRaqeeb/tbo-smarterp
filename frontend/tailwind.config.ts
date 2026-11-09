import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: { 50: "#eef2f9", 100: "#d6dff0", 600: "#1e3a6e", 700: "#16305c", 800: "#0f2547", 900: "#0a1a33" },
        // Inventory lifecycle indicators (Module 13)
        ind: {
          fast: "#16a34a",     // green  - fast seller
          active: "#2563eb",   // blue   - active inventory
          repost: "#eab308",   // yellow - repost required
          second: "#f97316",   // orange - second listing cycle
          dead: "#dc2626",     // red    - dead stock
          closed: "#6b7280",   // grey   - sold / closed
        },
      },
      fontFamily: { sans: ["Inter", "ui-sans-serif", "system-ui", "Segoe UI", "Roboto", "sans-serif"] },
    },
  },
  plugins: [],
};
export default config;
