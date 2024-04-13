export default defineNitroPlugin((nitroApp) => {
  const runtimeConfig = useRuntimeConfig();
  const ACCESS_TOKEN_SECRET = runtimeConfig.AccessTokenSecret;
  const ACCESS_TOKEN_EXPIRATION = runtimeConfig.AccessTokenExpiration;
  const REFRESH_TOKEN_SECRET = runtimeConfig.RefreshTokenSecret;
  const REFRESH_TOKEN_EXPIRATION = runtimeConfig.RefreshTokenExpiration;

  if (!ACCESS_TOKEN_SECRET || !REFRESH_TOKEN_SECRET) {
    console.error("Token secrets are not defined");
  }
  if (!ACCESS_TOKEN_EXPIRATION || !REFRESH_TOKEN_EXPIRATION) {
    console.error("Token expirations are not defined");
  }
});
