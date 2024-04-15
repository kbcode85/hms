<template>
  <Pie :data="chartData" :options="chartOptions" />
</template>

<script lang="ts" setup>
import { Pie } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
} from "chart.js";
import { ref } from "vue";

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale);

const chartData = ref({
  labels: ["Wolny", "Brudny", "Czysty", "Serwis"],
  datasets: [
    {
      data: [30, 50, 100, 40],
      backgroundColor: ["#f87979", "#7CFC00", "#FFD700", "#00BFFF"],
    },
  ],
});
const chartOptions = ref({
  maintainAspectRatio: false,
});
</script>

<style></style>
