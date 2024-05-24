import { usePrisma } from "~/server/utils/prisma";

type BookingStatus =
  | "PENDING"
  | "CONFIRMED"
  | "CANCELLED"
  | "CHECKED_IN"
  | "CHECKED_OUT";

export default defineEventHandler(async (event) => {
  const prisma = usePrisma();

  const {
    limit,
    page,
    query,
    startDate,
    endDate,
    status: statusString,
  } = getQuery(event);

  const status = statusString
    .split(",")
    .map((s) => s.trim()) as BookingStatus[];

  let bookings;
  let totalPages;
  try {
    bookings = await prisma.booking.findMany({
      take: Number(limit),
      skip: (Number(page) - 1) * Number(limit),
      include: {
        guest: true,
        room: true,
      },
      where: {
        OR: [
          {
            status: {
              in: status,
            },
          },
        ],
      },
    });

    const totalBookings = await prisma.booking.count({});
    totalPages = Math.ceil(totalBookings / Number(limit));

    if (bookings.length === 0) {
      setResponseStatus(event, 201, "No Content");
    }

    return { bookings, totalPages };
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error finding bookings: ${error.message}`);
    }
    throw error;
  }
});
