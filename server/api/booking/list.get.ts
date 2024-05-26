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

  let start: Date;
  let end: Date;

  if (typeof startDate === "string") {
    start = new Date(startDate);
  } else {
    start = new Date();
  }

  if (typeof endDate === "string") {
    end = new Date(endDate);
  } else {
    end = new Date();
    end.setDate(end.getDate() + 7);
  }

  let bookings;
  let totalPages;
  try {
    bookings = await prisma.booking.findMany({
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
      where: {
        AND: [
          {
            status: {
              in: statuses,
            },
          },
          {
            startDate: {
              gte: start,
              lte: end,
            },
          },
        ],
      },
    });

    const totalBookings = await prisma.booking.count({
      where: {
        AND: [
          {
            status: {
              in: statuses,
            },
          },
          {
            startDate: {
              gte: start,
              lte: end,
            },
          },
        ],
      },
    });
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
