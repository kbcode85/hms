import { hashPassword } from "~~/server/utils/password";
import { prisma } from "~~/prisma/db";

export default defineEventHandler(async (event) => {
  try {
    const { email, username, password } = await readBody(event);

    const user = await prisma.user.findFirst({
      where: { OR: [{ username }, { email }] },
    });

    if (user != null) {
      prisma.$disconnect();
      return {
        success: false,
        message: "Użytkownik już istnieje",
      };
    } else {
      const { salt, hash } = await hashPassword(password);

      const createUser: any = await prisma.user.create({
        data: {
          email: email,
          username: username,
          password: hash,
          salt: salt,
          lastLoginIpAddress: "",
        },
      });

      delete createUser.password;
      delete createUser.salt;

      await prisma.$disconnect();

      createUser.success = true;

      return createUser;
    }
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error: ${error.message}`);
    }
    throw error;
  }
});
