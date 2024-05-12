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
        console.log("checkStepCompleded 2");
        const step = this.steps.find((step) => step.id === stepId);
        if (step) {
          step.completed = true;
        }
      }
      if (stepId === 3) {
        console.log("checkStepCompleded 3");
        const step = this.steps.find((step) => step.id === stepId);
        if (step) {
          step.completed = true;
        }
      }
    },
  },
});
