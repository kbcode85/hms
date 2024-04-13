import { comparePasswords } from "~~/server/utils/password";
import { prisma } from "~~/prisma/db";
import {
  createAccessToken,
  createAndSetRefreshToken,
} from "~~/server/utils/session";

export default defineEventHandler(async (event) => {
  let username, password;
  try {
    ({ username, password } = await readBody(event));
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error reading body: ${error.message}`);
    }
    throw error;
  }

  let user;
  try {
    user = await prisma.user.findUnique({
      where: { username: username },
    });
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error finding user: ${error.message}`);
    }
    throw error;
  }

  if (user) {
    let match;
    try {
      match = await comparePasswords(password, user.password);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Error comparing passwords: ${error.message}`);
      }
      throw error;
    }

    if (match) {
      let token;
      try {
        token = await createAccessToken(user.id);
      } catch (error) {
        if (error instanceof Error) {
          throw new Error(
            `Error creating access token: ${error.message} Userid: ${user.id}`
          );
        }
        throw error;
      }

      setCookie(event, "token", token);

      const refreshCookie = getCookie(event, "refreshToken");

      if (
        !refreshCookie ||
        user.refreshToken !== refreshCookie ||
        (user.refreshTokenExpiresAt && user.refreshTokenExpiresAt < new Date())
      ) {
        let newRequestToken;
        try {
          newRequestToken = await createAndSetRefreshToken(user.id);
        } catch (error) {
          if (error instanceof Error) {
            throw new Error(`Error creating refresh token: ${error.message}`);
          }
          throw error;
        }

        if (newRequestToken) {
          setCookie(event, "refreshToken", newRequestToken);
        }
      }

      const lastLoginIpAddr = event.req.headers.hasOwnProperty(
        "x-forwarded-for"
      )
        ? event.req.headers["x-forwarded-for"]?.toString()
        : "127.0.0.1";

      let userdata;
      try {
        userdata = await prisma.user.update({
          where: { username: username },
          data: {
            lastLoginIpAddress: lastLoginIpAddr,
          },
        });
      } catch (error) {
        if (error instanceof Error) {
          throw new Error(`Error updating user: ${error.message}`);
        }
        throw error;
      }

      try {
        await prisma.$disconnect();
      } catch (error) {
        if (error instanceof Error) {
          throw new Error(`Error disconnecting from Prisma: ${error.message}`);
        }
        throw error;
      }

      return {
        id: userdata.id,
        token: token,
        refreshToken: userdata.refreshToken,
        refreshTokenExpiresAt: userdata.refreshTokenExpiresAt,
        success: true,
        message: "Pomyślne zalogowanie",
      };
    } else {
      return {
        success: false,
        message: "Nieprawidłowe dane logowania",
      };
    }
  } else {
    return {
      success: false,
      message: "Nieprawidłowe dane logowania",
    };
  }
});
