import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import vue from '@vitejs/plugin-vue'
import Pages from 'vite-plugin-pages'

export default defineConfig({
  plugins: [
    laravel({
      input: ['resources/css/loader.css', 'resources/js/main.js'],
      refresh: true,
    }),
    vue({
      template: {
          transformAssetUrls: {
              base: null,
              includeAbsolute: false,
          },
      },
    }),
    Pages({
      dirs: ['./resources/js/pages'],
    }),
  ],
  resolve: {
    extensions: [".mjs", ".js", ".ts", ".jsx", ".tsx", ".json", ".vue", ".css"],
    alias: {
      '@': fileURLToPath(new URL('./resources/js', import.meta.url)),
      '@css': fileURLToPath(new URL('./resources/css', import.meta.url)),
    },
  },
});
