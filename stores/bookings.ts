import { defineStore } from "pinia";

type Addition = {
  id: number;
  name: string;
  price: number;
  quantity: number;
};

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
  totalPages: number;
}

export const useMyBookingsStore = defineStore({
  id: "myBookingsStore",
  state: () => ({
    activeActions: null as string | null,
    currentStep: 1,
    isModalOpen: false,
    isStepper: false,
    dateStart: new Date(),
    dateEnd: new Date(),
    room: null as Number | null,
    guest: null as Number | null,
    bookings: [] as Booking[],
    additions: [] as Addition[],
    loading: false,
    totalPages: 0,
    steps: [
      {
        id: 1,
        title: "Okres pobytu",
        icon: "date_range",
        completed: false,
      },
      {
        id: 2,
        title: "Wybierz pokój",
        icon: "hotel",
        completed: false,
      },
      {
        id: 3,
        title: "Dane osobowe",
        icon: "person",
        completed: false,
      },
      {
        id: 4,
        title: "Dodatki",
        icon: "note_add",
        completed: false,
      },
      {
        id: 5,
        title: "Podsumowanie",
        icon: "receipt",
        completed: false,
      },
    ],
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
            status: status,
          },
        });

        if (response) {
          this.bookings = response.bookings;
          this.totalPages = response.totalPages;
        }
      } catch (error) {
        console.error("Failed to fetch bookings:", error);
        push.error("Błąd podczas pobierania meldunków");
      } finally {
        this.loading = false;
      }
    },
    selectRoom(roomId: number) {
      this.room = roomId;
      if (this.room !== null) {
        this.checkStepCompleted(2);
        console.log("selectRoom", this.room);
      }
    },
    selectGuest(guestId: number) {
      this.guest = guestId;
      if (this.guest !== null) {
        this.checkStepCompleted(3);
        console.log("selectGuest", this.guest);
      }
    },
    setDate(dateStart: Date, dateEnd: Date) {
      this.dateStart = dateStart;
      this.dateEnd = dateEnd;
    },
    stepper(action: string) {
      if (action === "open") {
        this.resetValues();
        this.isStepper = true;
      }
      if (action === "close") {
        this.resetValues();
        this.isStepper = false;
      }
    },
    nextStep() {
      if (this.currentStep < this.steps.length) {
        this.currentStep++;
      }
      if (this.currentStep === 4) {
        this.checkStepCompleted(4);
      }
      if (this.currentStep === 5) {
        this.checkStepCompleted(5);
      }
    },
    setCurrentStep(stepId: number) {
      this.currentStep = stepId;
    },
    checkStepCompleted(stepId: number) {
      if (stepId === 1) {
        const today = new Date();
        today.setHours(0, 0, 0, 0); // ustawiamy godzinę na początek dnia
        const startDate = new Date(this.dateStart);
        startDate.setHours(0, 0, 0, 0); // ustawiamy godzinę na początek dnia
        const endDate = new Date(this.dateEnd);
        const differenceInTime = endDate.getTime() - startDate.getTime();
        const differenceInDays = Math.ceil(
          differenceInTime / (1000 * 3600 * 24),
        );
        const step = this.steps.find((step) => step.id === stepId);
        if (step) {
          if (
            startDate >= today && // porównujemy tylko daty, nie godziny
            differenceInDays > 1
          ) {
            step.completed = true;
          } else {
            step.completed = false;
          }
        }
      }
      if (stepId === 2) {
        if (this.room !== null) {
          const step = this.steps.find((step) => step.id === stepId);
          if (step) {
            step.completed = true;
          }
        }
      }
      if (stepId === 3) {
        if (this.guest !== null) {
          const step = this.steps.find((step) => step.id === stepId);
          if (step) {
            step.completed = true;
          }
        }
      }
      if (stepId === 4) {
        if (this.additions !== null) {
          const step = this.steps.find((step) => step.id === stepId);
          if (step) {
            step.completed = true;
          }
        }
      }
      if (stepId === 5) {
        if (this.guest !== null) {
          const step = this.steps.find((step) => step.id === stepId);
          if (step) {
            step.completed = true;
          }
        }
      }
    },
    async getAddition() {
      try {
        const response = await $fetch<Addition[]>(`/api/booking/addition`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            // Authorization: `Bearer ${token}`,
          },
        });

        if (response) {
          this.additions = response;
        }
      } catch (error) {
        push.error("Błąd podczas dodawania meldunku");
      }
    },
    updateAddition(additionId: number, quantity: number) {
      const addition = this.additions.find(
        (addition) => addition.id === additionId,
      );
      if (addition) {
        addition.quantity = quantity;
      }
    },
    async addCheckin(price: number) {
      try {
        const response = await $fetch("/api/booking/create", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            startDate: this.dateStart,
            endDate: this.dateEnd,
            roomId: this.room,
            guestId: this.guest,
            additions: this.additions,
            price: price,
            status: "CHECKED_IN",
            source: "DIRECT",
          }),
        });

        if (response) {
          push.success("Pomyślnie dodano meldunek");
          this.stepper("close");
          this.resetValues();
        }
      } catch (error) {
        push.error("Błąd podczas dodawania meldunku");
      }
    },
    resetValues() {
      this.currentStep = 1;
      this.dateStart = new Date();
      this.dateEnd = new Date();
      this.room = null;
      this.guest = null;
      this.additions = [];

      for (const step of this.steps) {
        step.completed = false;
      }
    },
  },
});
