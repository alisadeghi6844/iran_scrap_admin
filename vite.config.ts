import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    hmr: {
      protocol: 'ws', // یا 'wss' برای ارتباط امن
      host: 'localhost', // یا IP سرور شما
      port: 3000, // پورت HMR
    },
  },
  plugins: [
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        name: "Your App Name",
        short_name: "App",
        start_url: "/",
        display: "standalone",
        theme_color: "#ffffff",
        background_color: "#ffffff",
        icons: [
          {
            src: "icon.png",
            sizes: "192x192",
            type: "image/png",
          },
        ],
      },
    }),
    react(),
  ],
  assetsInclude: ["**/*.riv"],
  base: '/',
});
