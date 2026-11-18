import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import solid from "@solidjs/vite-plugin";

export default defineConfig({
  base: "./",
  plugins: [solid()],
  build: {
    rollupOptions: {
      input: {
        home: fileURLToPath(new URL("index.html", import.meta.url)),
        domains: fileURLToPath(new URL("domains.html", import.meta.url)),
      },
    },
  },
});
