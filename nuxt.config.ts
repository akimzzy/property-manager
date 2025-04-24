import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [],
  devServer: {
    port: 8080, // Frontend port
  },
  ssr: false, // Disable server-side rendering
  compatibilityDate: "2025-03-14",
  devtools: { enabled: true },
  css: ["~/assets/css/main.css"],
  vite: {
    plugins: [tailwindcss()],
  },
});
