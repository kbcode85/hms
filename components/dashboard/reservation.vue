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
      backgroundColor: "#f87979",
      data: [40, 20, 12, 50, 10, 30, 40],
    },
  ],
});
const chartOptions = ref({
  responsive: true,
  maintainAspectRatio: false,
});
</script>

<style></style>
