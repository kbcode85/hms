
module.exports = {
  apps: [
    {
      name: "HMS",
      port: "3000",
      exec_mode: "cluster",
      instances: "max",
      script: "./.output/server/index.mjs",
      env: {
        DATABASE_URL: import.meta.env.DATABASE_URL,
        DIRECT_URL: import.meta.env.DIRECT_URL,
        ACCESS_TOKEN_SECRET: import.meta.env.ACCESS_TOKEN_SECRET,
        ACCESS_TOKEN_EXPIRATION: import.meta.env.ACCESS_TOKEN_EXPIRATION,
        REFRESH_TOKEN_SECRET: import.meta.env.REFRESH_TOKEN_SECRET,
        REFRESH_TOKEN_EXPIRATION: import.meta.env.REFRESH_TOKEN_EXPIRATION,
        NUXT_PUBLIC_SENTRY_DSN: import.meta.env.NUXT_PUBLIC_SENTRY_DSN,
        NUXT_PUBLIC_ENV: import.meta.env.NUXT_PUBLIC_ENV,
      },
    },
  ],
};
