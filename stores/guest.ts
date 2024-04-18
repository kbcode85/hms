import { defineStore } from "pinia";
import type { Guest } from "~/server/models/guest";

interface ResponseType {
  guests: Guest[];
  totalPages: number;
}

export const useMyGuestStore = defineStore({
  id: "myGuestStore",
  state: () => ({
    guests: [] as Guest[],
    loading: false,
    totalPages: 0,
  }),
  actions: {
    async fetchGuests(limit: number, page: number) {
      this.loading = true;
      try {
        const response = await $fetch<ResponseType>(`/api/guest/list`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            // Authorization: `Bearer ${token}`,
          },
          params: {
            page: page,
            limit: limit,
          },
        });

        if (response) {
          this.guests = response.guests;
          this.totalPages = response.totalPages;
        }
      } catch (error) {
        console.error("Failed to fetch guests:", error);
      } finally {
        this.loading = false;
      }
    },
  },
});
