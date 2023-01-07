// Plugins
import vue from "@vitejs/plugin-vue"
import vuetify, { transformAssetUrls } from "vite-plugin-vuetify"
import { VitePWA } from "vite-plugin-pwa";

// Utilities
import { defineConfig } from "vite"
import { fileURLToPath, URL } from "node:url"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      template: { transformAssetUrls }
    }),
    // https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vite-plugin
    vuetify({
      autoImport: true,
    }),
    VitePWA({
      registerType: "autoUpdate",
      workbox: {
        globPatterns: [
          'image/*.{png,ico,svg}',
          'assets/*.{css,js,ttf,woff,woff2}',
          'index.html',
          'registerSW.js'
        ],
        ignoreURLParametersMatching: [/^v$/]
      },
      manifest: {
        name: "Quantum Wormhole",
        short_name: "QuantumWormhole",
        description: "Quantum Wormhole by HelloGwkki",
        theme_color: "#ffffff",
        icons: [
          {
            src: "image/pwa-192x192.png",
            sizes: "192x192",
            type: "image/png"
          },
          {
            src: "image/pwa-512x512.png",
            sizes: "512x512",
            type: "image/png"
          },
          {
            src: "image/mask-icon.svg",
            sizes: "512x512",
            type: "image/svg",
            purpose: "any maskable"
          }
        ]
      },
    })
  ],
  define: { "process.env": {} },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url))
    },
    extensions: [
      ".js",
      ".json",
      ".jsx",
      ".mjs",
      ".ts",
      ".tsx",
      ".vue",
    ],
  }
})
