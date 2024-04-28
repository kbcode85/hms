import { usePrisma } from "~/server/utils/prisma";

export default defineEventHandler(async (event) => {
  const prisma = usePrisma();

  let rooms;

  try {
    rooms = await prisma.room.findMany({
      include: {
        equipment: true,
      },
    });

    if (rooms.length === 0) {
      setResponseStatus(event, 201, "No Content");
    }

    rooms.sort((a, b) => Number(a.number) - Number(b.number));

    return rooms;
  } catch (error) {
    console.error("Failed to fetch rooms:", error);
  }
});
