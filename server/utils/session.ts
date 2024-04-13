import jwt from "jsonwebtoken";
import { prisma } from "~~/prisma/db";
const runtimeConfig = useRuntimeConfig();

const ACCESS_TOKEN_SECRET = runtimeConfig.AccessTokenSecret;
const ACCESS_TOKEN_EXPIRATION = runtimeConfig.AccessTokenExpiration;
const REFRESH_TOKEN_SECRET = runtimeConfig.RefreshTokenSecret;
const REFRESH_TOKEN_EXPIRATION = runtimeConfig.RefreshTokenExpiration;

if (!ACCESS_TOKEN_SECRET || !REFRESH_TOKEN_SECRET) {
  throw new Error("Token secrets are not defined");
}

if (!ACCESS_TOKEN_EXPIRATION || !REFRESH_TOKEN_EXPIRATION) {
  throw new Error("Token expirations are not defined");
}

export function createAccessToken(userId: string) {
  const payload = {
    userId,
  };

  return jwt.sign(payload, ACCESS_TOKEN_SECRET, {
    expiresIn: ACCESS_TOKEN_EXPIRATION,
  });
}

export function createRefreshToken(userId: string) {
  const payload = {
    userId,
  };
  return jwt.sign(payload, REFRESH_TOKEN_SECRET, {
    expiresIn: REFRESH_TOKEN_EXPIRATION,
  });
}

export function verifyAccessToken(token: string) {
  try {
    const decoded = jwt.verify(token, runtimeConfig.AccessTokenSecret);
    return { valid: true, expired: false, decoded };
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return { valid: false, expired: true, decoded: null };
    } else {
      return { valid: false, expired: false, decoded: null };
    }
  }
}

export function verifyRefreshToken(token: string) {
  try {
    const decoded = jwt.verify(token, runtimeConfig.RefreshTokenSecret);
    return { valid: true, expired: false, decoded };
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return { valid: false, expired: true, decoded: null };
    } else {
      return { valid: false, expired: false, decoded: null };
    }
  }
}

export function getUserIdFromToken(token: string): string | null {
  try {
    const decoded = decodeToken(token);

    if (typeof decoded === "object" && decoded.hasOwnProperty("userId")) {
      return decoded.userId;
    } else {
      return null;
    }
  } catch (err) {
    return null;
  }
}

export function decodeToken(token: string): any {
  return jwt.decode(token);
}

export async function getStoreRefreshToken(
  userId: string | null
): Promise<string | null> {
  if (!userId) {
    return null;
  }
  try {
    const storedRefreshToken = await prisma.user.findUnique({
      where: { id: userId },
    });

    return storedRefreshToken ? storedRefreshToken.refreshToken : null;
  } catch (error) {
    return null;
  }
}

export async function createAndSetRefreshToken(userId: string) {
  try {
    const refreshToken = await createRefreshToken(userId);
    await prisma.user.update({
      where: { id: userId },
      data: {
        refreshToken: refreshToken,
        refreshTokenExpiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
      },
    });
    return refreshToken;
  } catch (error) {
    return null;
  }
}

export async function getUserData(token: string) {
  const userId = getUserIdFromToken(token);
  if (!userId) {
    return null;
  }

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      username: true,
      email: true,
    },
  });

  return user;
}
