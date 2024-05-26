import { defineStore } from "pinia";

interface ResponseType {
  bookings: [];
  totalPages: number;
}

export const useMyBookingsStore = defineStore({
  id: "myBookingsStore",
  state: () => ({
    bookings: [],
    loading: false,
    totalPages: 0,
  }),
  actions: {
    async fetchBookings(
      limit: number,
      page: number,
      sq: string,
      startDate: string,
      endDate: string,
      status?: string[],
    ) {
      try {
        const response = await $fetch<ResponseType>("/api/booking/list", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            // Authorization: `Bearer ${token}`,
          },
          params: {
            page: page,
            limit: limit,
            query: sq,
            startDate: startDate,
            endDate: endDate,
            status: status?.join(","),
          },
        });

        if (response) {
          this.bookings = response.bookings;
          this.totalPages = response.totalPages;
        }
      } catch (error) {
        console.error("Failed to fetch bookings:", error);
      } finally {
        this.loading = false;
      }
    },
  },
});
