import { defineStore } from "pinia";

interface UserData {
  success: boolean;
  message: string;
  userdata: {
    id: string;
    username: string;
    email: string;
  };
}

interface ServerResponse {
  message: string;
  status: number;
}

export const useAuthStore = defineStore({
  id: "auth",
  state: () => ({
    data: {
      success: false,
      message: "",
      userdata: { id: "", username: "", email: "" },
    } as UserData,
  }),
  actions: {
    async checkAuth() {
      const token = useCookie("token").value || "";

      try {
        const response: ServerResponse = await $fetch("/api/auth/token", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          this.data = {
            success: true,
            message: response.message,
            userdata: { id: "", username: "", email: "" },
          };
		  
        }
      } catch (error) {
        console.log(error);
        // Dodać obsługę błędów
      }
    },
    async logout(): Promise<ServerResponse> {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
      });

      const data = await response.json();

      if (response.ok) {
        this.data = {
          success: false,
          message: "",
          userdata: { id: "", username: "", email: "" },
        };
        return { message: data.message, status: response.status };
      } else {
        return { message: data.message, status: response.status };
      }
    },
    async login(username: string, password: string): Promise<ServerResponse> {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        this.data = data;
        return { message: data.message, status: response.status };
      } else {
        return { message: data.message, status: response.status };
      }
    },
  },
});
