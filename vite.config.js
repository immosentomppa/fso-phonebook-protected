import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    exclude: ["e2e-tests/**", "node_modules/**"],
    environment: "jsdom",
    globals: true,
    setupFiles: "./test/testSetup.js",
  },
})
