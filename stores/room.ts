import { defineStore } from "pinia";
import type { Room } from "~/server/models/room";

export const useMyRoomStore = defineStore({
  id: "myRoomStore",
  state: () => ({
    rooms: [] as Room[],
    isLoading: false,
    isModalOpen: false,
    activeAction: "",
    room: {} as Room,
  }),
  actions: {
    async fetchRooms() {
      this.isLoading = true;
      try {
        const response = await $fetch<Room[]>(`/api/room/list`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            // Authorization: `Bearer ${token}`,
          },
        });

        if (response) {
          this.rooms = response;
        }
      } catch (error) {
        console.error("Failed to fetch rooms:", error);
      } finally {
        this.isLoading = false;
      }
    },
    closeModal() {
      this.isModalOpen = false;
    },
    openModal(action: string) {
      this.isModalOpen = true;
      this.activeAction = action;
    },
    async deleteRoom(roomId?: number) {
      try {
        await $fetch(`/api/room/${roomId}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            // Authorization: `Bearer ${token}`,
          },
        });
      } catch (error) {
        console.error("Failed to delete room:", error);
      }

      this.isModalOpen = false;
    },
    async fetchRoom(roomId: number) {
      try {
        const response = await $fetch<Room>(`/api/room/${roomId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            // Authorization: `Bearer ${token}`,
          },
        });

        if (response) {
          this.room = response;
        }
      } catch (error) {
        console.error("Failed to fetch room:", error);
      }
    },
  },
});
