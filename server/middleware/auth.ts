export default defineEventHandler(async (event) => {
  const authorization = getRequestHeader(event, "Authorization");
  const token =
    authorization && authorization.startsWith("Bearer ")
      ? authorization.slice(7)
      : null;

  const protectedPaths = ["/api/auth/token", "/api/hotel"];

  if (
    protectedPaths.some((path) => getRequestURL(event).pathname.includes(path))
  ) {
    if (
      !token ||
      verifyRefreshToken(token).valid ||
      !getUserIdFromToken(token) ||
      !verifyAccessToken(token).valid
    ) {
      throw createError({
        statusCode: 401,
        message: "Unauthorized",
      });
    }
  }
});
