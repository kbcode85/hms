import { usePrisma } from "~/server/utils/prisma";

type BookingStatus =
  | "PENDING"
  | "CONFIRMED"
  | "GUARANTEED"
  | "CANCELED"
  | "CHECKED_IN"
  | "CHECKED_OUT";

export default defineEventHandler(async (event) => {
  const prisma = usePrisma();
  const { limit, page, query, startDate, endDate, status } = getQuery(event);

  let statuses: BookingStatus[];

  if (typeof status === "string") {
    statuses = status.split(",") as BookingStatus[];
  } else {
    statuses = [
      "PENDING",
      "CONFIRMED",
      "GUARANTEED",
      "CANCELED",
      "CHECKED_IN",
      "CHECKED_OUT",
    ];
  }

  const where: any = {
    status: {
      in: statuses,
    },
  };

  if (typeof query === "string" && query.trim() !== "") {
    const searchConditions = [
      { guest: { name: { contains: query, mode: "insensitive" } } },
      { guest: { surname: { contains: query, mode: "insensitive" } } },
      { guest: { email: { contains: query, mode: "insensitive" } } },
    ];
    where.OR = searchConditions;
  }

  // Warunki dla dat startu i końca rezerwacji
  if (
    typeof startDate === "string" &&
    startDate.trim() !== "" &&
    typeof endDate === "string" &&
    endDate.trim() !== ""
  ) {
    where.startDate = {
      gte: new Date(startDate),
      lte: new Date(endDate),
    };
  }

  try {
    const bookings = await prisma.booking.findMany({
      take: Number(limit),
      skip: (Number(page) - 1) * Number(limit),
      include: {
        guest: true,
        room: true,
        additions: {
          include: {
            addition: true,
          },
        },
      },
      where,
    });

    const totalBookings = await prisma.booking.count({
      where,
    });
    const totalPages = Math.ceil(totalBookings / Number(limit));

    if (bookings.length === 0) {
      setResponseStatus(event, 204);
    }

    return { bookings, totalPages };
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error finding bookings: ${error.message}`);
    }
    throw error;
  }
});
