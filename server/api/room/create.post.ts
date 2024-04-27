import { usePrisma } from "~/server/utils/prisma";

export default defineEventHandler(async (event) => {
  const prisma = usePrisma();

  const data = await readBody(event);

  const newRoom = await prisma.room.create({
    data: data,
  });

  setResponseStatus(event, 201, "Created");
  return {
    message: "Successful add",
    roodata: {
      newRoom,
    },
  };
});
