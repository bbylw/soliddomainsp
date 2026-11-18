import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import solid from "@solidjs/vite-plugin";

export default defineConfig({
  base: "./",
  plugins: [
    solid(),
    {
      // Vite re-emits entry <script> tags without extra attributes; restore
      // blocking="render" so cross-document view transitions snapshot the
      // rendered app shell instead of an empty page.
      name: "preserve-render-blocking-entry",
      transformIndexHtml: {
        order: "post",
        handler(html) {
          return html.replace(
            /<script type="module" crossorigin src="([^"]+)"><\/script>/,
            '<script type="module" crossorigin src="$1" blocking="render"></script>',
          );
        },
      },
    },
  ],
  build: {
    rollupOptions: {
      input: {
        home: fileURLToPath(new URL("index.html", import.meta.url)),
        domains: fileURLToPath(new URL("domains.html", import.meta.url)),
      },
    },
  },
});
