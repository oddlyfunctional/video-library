import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { PORT } from "./server/config";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": `http://localhost:${PORT}`,
    },
  },
});
