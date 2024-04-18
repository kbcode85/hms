<template>
  <table class="table">
    <thead>
      <tr style="position: sticky; top: 0; background: white; z-index: 1">
        <th>Gość</th>
        <th class="text-right">Pokój</th>
      </tr>
    </thead>
    <tr
      v-for="(guest, index) in guests_stay"
      :key="index"
      :class="{ 'bg-light': index % 2 === 1 }"
    >
      <td>{{ guest.name }}</td>
      <td class="text-right">{{ guest.roomNumber }}</td>
    </tr>
  </table>
</template>

<script lang="ts" setup>
import { faker } from "@faker-js/faker";
interface Guest {
  name: string;
  roomNumber: string;
}
const guests_stay: Guest[] = Array.from({ length: 30 }, () => ({
  name: faker.person.fullName(),
  roomNumber: faker.number.int({ min: 100, max: 200 }).toString(),
}));
</script>

<style></style>
