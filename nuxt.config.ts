// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    // '@nuxt/eslint',
    // 'nuxt-icon',
    // '@nuxtjs/sitemap',
  ],
  buildModules: ['@nuxtjs/svg'],
  eslint: {},
  components: [
    {
      path: '~/components',
      pathPrefix: false,
    },
  ],
} as any)
