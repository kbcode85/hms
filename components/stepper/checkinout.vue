<template>
  <div>
    <!-- Header section -->
    <div class="row mb-2 mb-xl-3">
      <div class="col-auto d-none d-sm-block">
        <h3>Nowy meldunek</h3>
      </div>

      <div class="col-auto ms-auto text-end mt-n1">
        <button
          class="btn btn-primary d-flex align-items-center gap-2"
          @click="stepper('close')"
        >
          Anuluj <span class="material-icons-sharp">cancel</span>
        </button>
      </div>
    </div>

    <!-- Stepper content -->
    <div class="row">
      <div class="col">
        <!-- Stepper navigation -->
        <div class="steps-container">
          <div v-for="step in steps" :key="step.id" class="step-wrapper">
            <div
              class="step"
              :class="{
                active: step.id === currentStep,
                disabled: !step.completed,
              }"
              @click="setCurrentStep(step.id)"
            >
              <div class="step-container">
                <div class="circle">
                  <span class="material-icons-sharp">{{ step.icon }}</span>
                </div>
                <div class="title d-none d-md-block">{{ step.title }}</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Step details -->
        <div class="step-details mt-4 relative">
          <div
            v-if="activeStep"
            class="d-flex flex-column flex-md-row justify-content-evenly"
          >
            <p class="title d-block d-md-none">{{ activeStep.title }}</p>
            <div v-if="activeStep.id === 1" class="m-2">
              <VDatePicker
                ref="calendar"
                v-model.range="date"
                :attributes="attrs"
                :columns="columns"
                :expanded="expanded"
                :min-date="new Date()"
              >
                <template #footer>
                  <div class="w-full px-4 pb-3">
                    <button class="btn btn-primary" @click="moveToday">
                      Dzisiaj
                    </button>
                  </div>
                </template>
              </VDatePicker>
            </div>
            <div v-if="activeStep.id === 1" class="m-2">
              <p>
                <strong>Data przyjazdu:</strong>
                {{ dateStart }}
              </p>
              <p>
                <strong>Data wyjazdu:</strong>
                {{ dateEnd }}
              </p>
              <p>
                <strong>Ilość nocy:</strong>
                {{ calculateNights(date.start, date.end) }}
              </p>
            </div>
            <div v-if="activeStep.id === 2" class="m-2">pokoje</div>
          </div>
        </div>

        <!-- Navigation buttons -->
        <div class="navigation-buttons mt-4">
          <button
            class="btn btn-primary"
            :disabled="!activeStep?.completed"
            @click="nextStep()"
          >
            Następny
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { format } from "date-fns";
const formatDate = (date: Date) => {
  return format(date, "yyyy-mm-dd");
};

const calculateNights = (start: Date, end: Date) => {
  const diffTime = Math.abs(end.getTime() - start.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

const store = useMyCheckinoutStore();

const rooms = useMyRoomStore();

const currentStep = computed(() => store.currentStep);
const steps = computed(() => store.steps);
const activeStep = computed(() => {
  return steps.value.find((step) => step.id === currentStep.value);
});

const setCurrentStep = (step: number) => {
  store.currentStep = step;
};

const nextStep = () => store.nextStep();
const stepper = (action: string) => store.stepper(action);

import { useScreens } from "vue-screen-utils";

const dateStart = computed(() => store.dateStart);
const dateEnd = computed(() => store.dateEnd);

const date = ref({
  start: new Date(),
  end: (() => {
    const date = new Date();
    date.setDate(date.getDate() + 1);
    return date;
  })(),
});

onMounted(async () => {
  await store.setDate(date.value.start, date.value.end);
});

watch(date, async () => {
  await store.setDate(date.value.start, date.value.end);
});

onMounted(async () => {
  await rooms.fetchAvailableRooms(date.value.start, date.value.end);
});

watch(dateStart, async () => {
  await rooms.fetchAvailableRooms(date.value.start, date.value.end);
});

const attrs = ref([
  {
    key: "today",
    highlight: {
      color: "green",
      fillMode: "solid",
    },
    dates: new Date(),
  },
]);

const calendar = ref();

function moveToday() {
  calendar.value.move(new Date());
}

const { mapCurrent } = useScreens({
  xs: "0px",
  sm: "640px",
  md: "768px",
  lg: "1024px",
});

const columns = mapCurrent({ lg: 2 }, 1);
const expanded = mapCurrent({ lg: false }, true);

onMounted(async () => {
  await store.checkStepCompleted(currentStep.value);
});

watch(dateStart, async () => {
  await store.checkStepCompleted(currentStep.value);
});
</script>

<style lang="scss" scoped>
.steps-container {
  display: flex;
  align-items: center;
}

.step-container {
  display: flex;
  align-items: center;
}

.step-wrapper {
  display: flex;
  align-items: center;
  margin-right: 20px;
}

.step {
  display: flex;
  cursor: pointer;
}

.circle {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ccc;
  color: black;
}

.active .circle {
  background-color: #007bff;
  color: white;
}

.title {
  padding-left: 5px;
  padding-right: 20px;
  font-size: 16px;
}

.step-details {
  border: 1px solid #ccc;
  padding: 20px;
  border-radius: 5px;
}
.disabled {
  pointer-events: none;
  opacity: 0.6;
}
@media (max-width: 767px) {
  .material-icons-sharp {
    font-size: 18px;
  }
}
</style>
