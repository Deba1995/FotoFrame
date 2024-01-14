import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/foto-frame/", // Update the base URL to match your deployed website
  plugins: [react()],
  build: {
    // Set to 'production' for production optimizations
    mode: "production",
    // Enable minification
    minify: "terser",
    // Configure code splitting
    chunkSizeWarningLimit: 2000,
    // Enable tree shaking
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
    // Enable cache busting
    outDir: "dist",
    assetsDir: "assets",
    assetsInlineLimit: 4096,
    sourcemap: false,
    rollupOptions: {
      output: {
        entryFileNames: "[name].[hash].js",
        chunkFileNames: "[name].[hash].js",
        assetFileNames: "[name].[hash].[ext]",
      },
    },
  },
});
