import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

// import tagger from "@dhiwise/component-tagger"; // ❌ Remove this

export default defineConfig({
  build: {
    outDir: "dist",
    chunkSizeWarningLimit: 2000,
  },
  plugins: [
    tsconfigPaths(),
    react(),
    // tagger(), // ❌ Remove this
  ],
  server: {
    port: "4028",
    host: "0.0.0.0",
    strictPort: true,
    allowedHosts: [".amazonaws.com", ".builtwithrocket.new"],
  },
});
