import { defineConfig } from "vitest/config"
import { fileURLToPath, URL } from "node:url"
import react from "@vitejs/plugin-react"

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => ({
  plugins: [react()],
  server: {
    open: true,
    host: "0.0.0.0",
    port: 3000,
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  build: {
    outDir: "build",
    sourcemap: true,
    minify: mode === "development" ? false : "terser",
    rollupOptions: {
      output: {
        assetFileNames: "clientlib-site/resources/[ext]/[name][extname]",
        chunkFileNames: "clientlib-site/resources/chunks/[name].[hash].js",
        entryFileNames: "clientlib-site/resources/js/[name].js",
      },
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "src/setupTests",
    mockReset: true,
  },
}))
