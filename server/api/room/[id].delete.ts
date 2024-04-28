import { usePrisma } from "~/server/utils/prisma";

export default defineEventHandler(async (event) => {
  const prisma = usePrisma();

  const params = getRouterParams(event);
  const id = Number(params.id);

  const room = await prisma.room.findUnique({
    where: {
      id: id,
    },
  });

  if (room) {
    // Najpierw usuń pokój
    await prisma.room.delete({
      where: {
        id: id,
      },
    });

    // Następnie usuń sprzęt
    await prisma.equipment.delete({
      where: {
        id: room.equipmentId,
      },
    });
  }

  setResponseStatus(event, 202, "Accepted");
  return {
    message: "room and associated equipment have been removed",
  };
});
