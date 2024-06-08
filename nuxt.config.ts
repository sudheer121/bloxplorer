// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    // '@nuxt/eslint',
    // 'nuxt-icon',
    // '@nuxtjs/sitemap',
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
  ],
  buildModules: ['@nuxtjs/svg'],
  eslint: {},
  components: [
    {
      path: '~/components',
      pathPrefix: false,
    },
  ],
  runtimeConfig: {
    public: {
      apiEndpoint: '',
    },
  },
} as any);
