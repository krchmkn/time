// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  typescript: {
    strict: true
  },
  css: ["@/assets/styles/base.css"],
  telemetry: false,
  app: {
    head: {
      htmlAttrs: {
        lang: 'en'
      },
      title: 'Time. App about time zones',
      meta: [
        { name: 'author', content: 'Dmitrii Korchemkin' },
        { name: 'description', content: 'App about time zones' },
        { name: 'theme-color', content: '#583b87' }
      ],
      link: [
        { rel: 'manifest', href: 'manifest.json' },
        { rel:'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' }
      ]
    }
  },
  runtimeConfig: {
    public: {
      defaultTimeZones: ['America/Costa_Rica', 'Europe/Moscow']
    }
  }
})
