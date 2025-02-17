import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: '0.0.0.0', // این خط باعث می‌شود که سرور به همه IPها دسترسی داشته باشد
    port: 5173, // پورت سرور
    hmr: {
      protocol: 'ws', // یا 'wss' برای ارتباط امن
      host: 'localhost', // برای HMR به همه IPها اجازه دسترسی می‌دهد
      port: 5173, // پورت HMR
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
