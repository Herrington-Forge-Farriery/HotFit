import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "happy-dom",
    setupFiles: "./src/setupTests.ts",
    include: ["tests/**/*.{test,spec}.{js,ts,jsx,tsx}"],
  },
});
