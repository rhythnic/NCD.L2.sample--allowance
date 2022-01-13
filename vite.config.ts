import { defineConfig } from "vite";
import { join } from "path";
import vue from "@vitejs/plugin-vue";
import inject from "@rollup/plugin-inject";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    // Buffer used in borsh (near-api-js)
    inject({ Buffer: ["buffer", "Buffer"] }),
    vue(),
  ],
  resolve: {
    alias: {
      "@": join(__dirname, "src"),
    },
  },
  define: {
    "process.env": {},
    global: {},
  },
});
