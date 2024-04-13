import { defineStore } from "pinia";

interface UserData {
  authed: boolean;
  userdata: {
    id: string;
    username: string;
    email: string;
  };
}

export const useAuthStore = defineStore({
  id: "auth",
  state: () => ({
    data: {
      authed: true,
      userdata: { id: "", username: "", email: "" },
    } as UserData,
  }),
  actions: {
    async checkToken(token: string) {
      if (!token) {
        this.data.authed = false;
      }

      try {
        const response = await fetch(`/api/auth/token`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          this.data.authed = true;
          const data = await response.json();
          this.data.userdata = data.userdata;
        } else if (response.status === 401) {
          this.data.authed = false;
        }
      } catch (error) {
        console.log(error);
      }
    },
    async logout() {
      try {
        const response = await fetch("/api/auth/logout", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.status === 200) {
          this.data.authed = false;
          if (process.client) {
            window.location.reload();
          }
        }
      } catch (error) {
        console.log(error);
      }
    },
    async login(username: string, password: string) {
      try {
        const response = await fetch("/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, password }),
        });

        if (response.status === 200) {
          const data = await response.json();
          this.data.authed = true;
          this.data.userdata = data.userdata;
          navigateTo("/");
        } else if (response.status === 401) {
          this.data.authed = false;
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
});
