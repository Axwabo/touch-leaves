import { VitePWA } from "vite-plugin-pwa";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

const base = "/touch-leaves/";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [ vue(), VitePWA({
        registerType: "prompt",
        injectRegister: false,

        pwaAssets: {
            disabled: false,
            config: true
        },

        manifest: {
            name: "Touch Leaves",
            short_name: "Touch Leaves",
            description: "Touch Leaves Simulator (Autumn-themed Touch Grass Simulator)",
            theme_color: "#ed8a00"
        },

        workbox: {
            globPatterns: [ "**/*.{js,css,html,svg,webp,ttf,ogg}" ],
            cleanupOutdatedCaches: true,
            clientsClaim: true
        },

        devOptions: {
            enabled: false,
            navigateFallback: "index.html",
            suppressWarnings: true,
            type: "module"
        },

        base
    }) ],

    base
})