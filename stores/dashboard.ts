import { defineStore } from "pinia";

import type { Room } from "~/server/models/room";

type Booking = {
  id: number;
  startDate: Date;
  endDate: Date;
  roomId: number;
  guestId: number;
  status: string;
  source: string;
  price: number;
  guest: {
    id: number;
    name: string;
    surname: string;
    phone: string;
    email: string;
    address: string;
    city: string;
    country: string;
    zip_code: string;
    description: null;
    nip: null;
  };
  room: {
    id: number;
    number: string;
    type: string;
    maxGuests: number;
    pricePerNight: number;
    status: string;
    equipmentId: number;
  };
  additions: {
    id: number;
    bookingId: number;
    additionId: number;
    quantity: number;
    addition: {
      id: number;
      name: string;
      price: number;
    };
  };
};

interface ResponseType {
  bookings: [];
}

type Response = {
  rooms: Room[];
};
export const useMyDashboardStore = defineStore({
  id: "myDashboardStore",
  state: () => ({
    stays: [] as Booking[],
    arrivals: [] as Booking[],
    departures: [] as Booking[],
    newBookings: [] as Booking[],
    weeklyBookings: [] as Booking[],
    rooms: {} as Room[],
  }),
  actions: {
    async fetchStays(status: string[]) {
      try {
        const response = await $fetch<ResponseType>("/api/booking/list", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            // Authorization: `Bearer ${token}`,
          },
          params: {
            status: status,
          },
        });

        if (response) {
          this.stays = response.bookings;
        }
      } catch (error) {
        console.error("Failed to fetch bookings:", error);
        push.error("Błąd podczas pobierania danych");
      }
    },
    async fetchTodayArrivals(
      status: string[],
      startDate: string,
      endDate: string,
    ) {
      try {
        const response = await $fetch<ResponseType>("/api/booking/list", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            // Authorization: `Bearer ${token}`,
          },
          params: {
            startDate: startDate,
            endDate: endDate,
            status: status,
          },
        });

        if (response) {
          this.arrivals = response.bookings;
        }
      } catch (error) {
        console.error("Failed to fetch bookings:", error);
        push.error("Błąd podczas pobierania danych");
      }
    },
    async fetchNewBookings(status: string[], startDate: string) {
      try {
        const response = await $fetch<ResponseType>("/api/booking/list", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            // Authorization: `Bearer ${token}`,
          },
          params: {
            startDate: startDate,
            status: status,
          },
        });

        if (response) {
          this.newBookings = response.bookings;
        }
      } catch (error) {
        console.error("Failed to fetch bookings:", error);
        push.error("Błąd podczas pobierania danych");
      }
    },
    async fetchWeeklyBookings(
      status: string[],
      startDate: string,
      endDate: string,
    ) {
      try {
        const response = await $fetch<ResponseType>("/api/booking/list", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            // Authorization: `Bearer ${token}`,
          },
          params: {
            startDate: startDate,
            endDate: endDate,
            status: status,
          },
        });

        if (response) {
          this.weeklyBookings = response.bookings;
        }
      } catch (error) {
        console.error("Failed to fetch bookings:", error);
        push.error("Błąd podczas pobierania danych");
      }
    },
    async fetchRooms() {
      try {
        const response = await $fetch<Response>(`/api/room/list`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            // Authorization: `Bearer ${token}`,
          },
        });

        if (response) {
          this.rooms = response.rooms;
        }
      } catch (error) {
        console.error("Failed to fetch rooms:", error);
      }
    },
  },
});
