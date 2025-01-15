import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { crx } from "@crxjs/vite-plugin";
import manifest from "./manifest.json";
// import path from "path"


export default defineConfig({
  plugins: [react(), crx({ manifest })],
  build: {
    rollupOptions: {
      input: {
        blocked: 'src/pages/blocked/index.html',
        popup: 'src/pages/popup/index.html',
        settings: 'src/pages/settings/index.html',
      },
    },
  },
});
