import { usePrisma } from "~/server/utils/prisma";

export default defineEventHandler(async (event) => {
  const prisma = usePrisma();

  const data = await readBody(event);

  const { equipment, room } = data;

  try {
    // Najpierw tworzymy pokój
    const newRoom = await prisma.room.create({
      data: room,
    });

    try {
      // Następnie tworzymy sprzęt
      const newEquipment = await prisma.equipment.create({
        data: equipment,
      });

      // Na koniec aktualizujemy pokój z nowym equipmentId
      await prisma.room.update({
        where: { id: newRoom.id },
        data: { equipmentId: newEquipment.id
         },
      });

      setResponseStatus(event, 201, "Created");
      return {
        message: "Successful add",
        roomData: {
          newRoom,
        },
      };
    } catch (equipmentError) {
      console.error("Failed to create equipment:", equipmentError);
      // Jeśli tworzenie sprzętu się nie powiedzie, usuwamy pokój
      await prisma.room.delete({
        where: { id: newRoom.id },
      });
      setResponseStatus(event, 500, "Internal Server Error");
      return {
        message: "Failed to create equipment",
      };
    }
  } catch (roomError) {
    console.error("Failed to create room:", roomError);
    setResponseStatus(event, 500, "Internal Server Error");
    return {
      message: "Failed to create room",
    };
  }
});
