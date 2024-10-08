// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  components: true,
  devtools: { enabled: true },

  css: [
    '@/assets/css/global.css',
    '@/assets/css/reset.css'
  ],

  modules: ['@nuxt/icon'],

  runtimeConfig: {
    public: {
      apiUrl: process.env.API_URL,
    }
  },
})