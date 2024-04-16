import { usePrisma } from "~/server/utils/prisma";

export default defineEventHandler(async (event) => {
  const prisma = usePrisma();

  let guests;
  try {
    guests = await prisma.guest.findMany();

    return guests;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error finding guests: ${error.message}`);
    }
    throw error;
  }
});
