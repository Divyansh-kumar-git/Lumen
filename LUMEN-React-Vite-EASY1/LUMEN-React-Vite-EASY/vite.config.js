import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0",
    port: 5173,
    strictPort: true,
    // Allows the Arena live-preview proxy host to load the Vite app.
    allowedHosts: true
  },
  preview: {
    host: "0.0.0.0",
    port: 4173,
    allowedHosts: true
  }
});
