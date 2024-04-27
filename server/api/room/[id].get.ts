import { usePrisma } from "~/server/utils/prisma";

export default defineEventHandler(async (event) => {
  const prisma = usePrisma();

  const params = getRouterParams(event);
  const id = Number(params.id);

  const room = await prisma.room.findUnique({
    where: {
      id: id,
    },
    include: {
      equipment: true,
    },
  });

  return room;
});
