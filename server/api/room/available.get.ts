import { usePrisma } from "~/server/utils/prisma";

export default defineEventHandler(async (event) => {
  const prisma = usePrisma();

  const { dateStart, dateEnd } = getQuery(event);

  if (typeof dateStart !== "string" || typeof dateEnd !== "string") {
    throw new Error("Dates must be strings");
  }

  let rooms;

  try {
    rooms = await prisma.room.findMany({
      where: {
        NOT: {
          reservations: {
            some: {
              AND: [
                {
                  startDate: {
                    lte: new Date(dateEnd),
                  },
                },
                {
                  endDate: {
                    gte: new Date(dateStart),
                  },
                },
              ],
            },
          },
        },
      },
    });

    if (rooms.length === 0) {
      setResponseStatus(event, 201, "No Content");
    }

    return rooms;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error finding available rooms: ${error.message}`);
    }
    throw error;
  }
});