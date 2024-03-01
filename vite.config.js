import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000, // Port for the Vite development server
    proxy: {
      "/socket.io": {
        target: "http://localhost:9000", // Target URL of your Express server
        ws: true, // Enable WebSocket proxying
      },
    },
  },
});
