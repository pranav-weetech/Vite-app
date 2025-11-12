import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:5000",
        secure: false,
      },
    },
    open: true,
    port: 5173,
    host: "0.0.0.0", // allows access from LAN/public IP
  },
  preview: {
    open: true,
    port: 5173,
    host: "0.0.0.0",
  },
  plugins: [react()],
});
