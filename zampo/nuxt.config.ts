import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'

export default defineNuxtConfig({
  ssr: false,
  devtools: { enabled: true },

  css: [
    'vuetify/lib/styles/main.sass',
    '@mdi/font/css/materialdesignicons.min.css',
    '@/assets/css/main.css',
    '@/assets/scss/global.scss',
    '@/assets/scss/settings.scss',

  ],

  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      title: 'Zampo',
    }
  },

  build: {
    transpile: ['vuetify'],
  },

  modules: [
    // (_options, nuxt) => {
    //   nuxt.hooks.hook('vite:extendConfig', (config) => {
    //     // @ts-expect-error
    //     config.plugins.push(vuetify({
    //       autoImport: true,
    //       styles: { configFile: "assets/scss/settings.scss" },
    //     }))
    //   })
    // },
    '@nuxtjs/i18n',
    '@pinia/nuxt',
    'nuxt-paypal',
  ],
  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },


  components: [
    { path: '@/components', extensions: ['vue'] },
    { path: '@/components/default', extensions: ['vue'] },
    { path: '@/components/signup', extensions: ['vue'] },
    { path: '@/components/posts', extensions: ['vue'] },
    { path: '@/components/posts/form', extensions: ['vue'] },
    { path: '@/components/comments', extensions: ['vue'] },
    { path: '@/components/home', extensions: ['vue'] },
    { path: '@/components/stories', extensions: ['vue'] },
  ],

  imports: {
    dirs: ['stores', 'composables', 'utils']
  },

   // PINIA CONFIG
   pinia: {
    autoImports: [
      // automatically imports `defineStore`
      'defineStore', // import { defineStore } from 'pinia'
    ],
  },


  // localization options
  i18n: {
    locales: [
      {
        code: 'en',
        iso: 'en-US',
        file: 'en-US.json',
      },
      {
        code: 'it',
        iso: 'it-IT',
        file: 'it-IT.json',
      },
    ],

    lazy: false,
    langDir: 'lang',
    defaultLocale: 'it',
    fallbackLocale: 'it',
    strategy: 'no_prefix',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'lan',
      redirectOn: 'root',
    },
    
  },

  runtimeConfig: {
    public:{GOOGLE_MAPS_API_KEY: process.env.GOOGLE_MAPS_API_KEY,
      PAYPAL_CLIENT_ID: process.env.PAYPAL_CLIENT_ID,
    }
},
})
