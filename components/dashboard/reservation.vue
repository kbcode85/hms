<template>
  <Bar :data="chartData" :options="chartOptions" />
</template>

<script lang="ts" setup>
import { Bar } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import { ref } from "vue";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
);
const store = useMyDashboardStore();

const weeklyBookingsCount = computed(() => {
  const counts = [0, 0, 0, 0, 0, 0, 0];
  store.weeklyBookings.forEach((booking) => {
    const date = new Date(booking.startDate);
    const dayOfWeek = date.getDay();
    counts[dayOfWeek] += 1;
  });
  counts.push(counts.shift());
  return counts;
});

const chartData = ref({
  labels: [
    "Poniedziałek",
    "Wtorek",
    "Środa",
    "Czwartek",
    "Piątek",
    "Sobota",
    "Niedziela",
  ],
  datasets: [
    {
      label: "Rezerwacje",
      backgroundColor: "#3b7ddd",
      data: weeklyBookingsCount.value,
    },
  ],
});
const chartOptions = ref({
  responsive: true,
  maintainAspectRatio: false,
});
</script>

<style></style>
