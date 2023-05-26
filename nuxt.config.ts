// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    ssr: false,
    modules: ["@nuxtjs/stylelint-module", "@pinia/nuxt", "nuxt-icons", "nuxt-typed-router"],

    css: ["assets/styles/global.scss", "reset-css/reset.css"],
    stylelint: {
        lintOnStart: false,
    },

    devtools: {
        enabled: true,
    },

    experimental: {
        reactivityTransform: true,
    },
});
