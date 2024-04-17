import { usePrisma } from "~/server/utils/prisma";

export default defineEventHandler(async (event) => {
  const prisma = usePrisma();

  const { limit, page } = getQuery(event);

  let guests;
  let totalPages;
  try {
    guests = await prisma.guest.findMany({
      take: Number(limit),
      skip: (Number(page) - 1) * Number(limit),
    });

    const totalGuests = await prisma.guest.count();
    totalPages = Math.ceil(totalGuests / Number(limit));

    return { guests, totalPages };
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error finding guests: ${error.message}`);
    }
    throw error;
  }
});
