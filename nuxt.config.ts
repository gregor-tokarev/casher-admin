// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  modules: [
    "@nuxtjs/stylelint-module",
    "@pinia/nuxt",
    "nuxt-icons",
    "nuxt-typed-router",
  ],

  css: ["assets/styles/global.scss"],
  stylelint: {
    lintOnStart: false,
  },

  alias: {
    pinia: "/node_modules/@pinia/nuxt/node_modules/pinia/dist/pinia.mjs",
  },

  devtools: {
    enabled: true,
  },
});
