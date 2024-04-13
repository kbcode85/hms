// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  runtimeConfig: {
    AccessTokenSecret: process.env.ACCESS_TOKEN_SECRET,
    AccessTokenExpiration: process.env.ACCESS_TOKEN_EXPIRATION,
    RefreshTokenSecret: process.env.REFRESH_TOKEN_SECRET,
    RefreshTokenExpiration: process.env.REFRESH_TOKEN_EXPIRATION,
    public: {
      sentry: {
        dsn: import.meta.env.NUXT_PUBLIC_SENTRY_DSN,
        environment: import.meta.env.NUXT_PUBLIC_ENV,
      },
    },
  },
  css: ["~/assets/scss/main.scss"],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "~/assets/scss/_variables" as *;',
        },
      },
    },
  },
  modules: ["@pinia/nuxt"],
  app: {
    head: {
      title: "HMSuite",
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          hid: "description",
          name: "description",
          content: "Hotel Management System",
        },
      ],
      script: [
        {
          src: "https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js",
        },
      ],
      link: [
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/icon?family=Material+Icons+Sharp",
        },
      ],
    },
  },
});
