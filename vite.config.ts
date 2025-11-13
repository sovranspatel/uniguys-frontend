import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "localhost", // you can keep "::" if needed for IPv6
    port: 8080,
    open: true,
    proxy: {
      // Forward all API calls to backend (port 8000)
      "/api": {
        target: "http://localhost:8000",
        changeOrigin: true,
        secure: false,
        // Remove /api prefix if your backend doesn’t include it
        // rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
