require("dotenv").config();
module.exports = {
  apps: [
    {
      name: "HMS",
      port: "3000",
      exec_mode: "cluster",
      instances: "max",
      script: "./.output/server/index.mjs",
      env: {
        DATABASE_URL: process.env.DATABASE_URL,
        DIRECT_URL: process.env.DIRECT_URL,
        ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
        ACCESS_TOKEN_EXPIRATION: process.env.ACCESS_TOKEN_EXPIRATION,
        REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,
        REFRESH_TOKEN_EXPIRATION: process.env.REFRESH_TOKEN_EXPIRATION,
        NUXT_PUBLIC_SENTRY_DSN: process.env.NUXT_PUBLIC_SENTRY_DSN,
        NUXT_PUBLIC_ENV: process.env.NUXT_PUBLIC_ENV,
      },
    },
  ],
};
