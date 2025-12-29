import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: '0.0.0.0', // این خط باعث می‌شود که سرور به همه IPها دسترسی داشته باشد
    port: 5173, // پورت سرور
    allowedHosts: [
      'admin.digifaarm.ir' // اضافه کردن هاست مجاز
    ],
  },
  plugins: [
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        name: "IranScrap Admin Panel",
        short_name: "IranScrap",
        start_url: "/",
        display: "standalone",
        theme_color: "#64748b",
        background_color: "#f8fafc",
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
