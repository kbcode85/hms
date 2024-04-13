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
        DATABASE_URL: proces.env.DATABASE_URL,
        DIRECT_URL: proces.env.DIRECT_URL,
        ACCESS_TOKEN_SECRET: proces.env.ACCESS_TOKEN_SECRET,
        ACCESS_TOKEN_EXPIRATION: proces.env.ACCESS_TOKEN_EXPIRATION,
        REFRESH_TOKEN_SECRET: proces.env.REFRESH_TOKEN_SECRET,
        REFRESH_TOKEN_EXPIRATION: proces.env.REFRESH_TOKEN_EXPIRATION,
        NUXT_PUBLIC_SENTRY_DSN: proces.env.NUXT_PUBLIC_SENTRY_DSN,
        NUXT_PUBLIC_ENV: proces.env.NUXT_PUBLIC_ENV,
      },
    },
  ],
};
