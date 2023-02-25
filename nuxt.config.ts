// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: ["@/assets/styles/base.css"],
  telemetry: false,
  ssr: false,
  app: {
    head: {
      title: 'Time. App about time zones',
      meta: [
        { name: 'author', content: 'Dmitrii Korchemkin' },
        { name: 'description', content: 'App about time zones' }
      ],
    }
  }
})
