import { defineStore } from "pinia";

export const useMyCheckinoutStore = defineStore({
  id: "myCheckinoutStore",
  state: () => ({
    activeActions: null as string | null,
    currentStep: 1,
    isModalOpen: false,
    isStepper: false,
    dateStart: new Date(),
    dateEnd: new Date(),
    room: null as Number | null,
    guest: null as Number | null,
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
        title: "Podsumowanie",
        icon: "receipt",
        completed: false,
      },
    ],
  }),
  actions: {
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
        this.isStepper = true;
      }
      if (action === "close") {
        this.isStepper = false;
      }
    },
    nextStep() {
      if (this.currentStep < this.steps.length) {
        this.currentStep++;
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
    },
  },
});
