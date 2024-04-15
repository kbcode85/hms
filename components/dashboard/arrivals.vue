<template>
  <div
    class="card-body"
    style="max-height: 400px; overflow-y: auto; padding: 0"
  >
    <table class="table">
      <thead>
        <tr style="position: sticky; top: 0; background: white; z-index: 1">
          <th>Imię i nazwisko</th>
          <th class="text-right">Numer pokoju</th>
          <th class="text-right">Status</th>
        </tr>
      </thead>
      <tr
        v-for="(guest, index) in guests_arrival"
        :key="index"
        :class="{ 'bg-light': index % 2 === 1 }"
      >
        <td>{{ guest.name }}</td>
        <td class="text-right">{{ guest.roomNumber }}</td>
        <td class="text-right">
          <i class="material-icons-sharp">{{ guest.status }}</i>
        </td>
      </tr>
    </table>
  </div>
</template>

<script lang="ts" setup>
import { faker } from "@faker-js/faker";
interface Guest {
  name: string;
  roomNumber: string;
  status?: string;
}
const guests_arrival: Guest[] = Array.from({ length: 30 }, () => ({
  name: faker.person.fullName(),
  roomNumber: faker.number.int({ min: 100, max: 200 }).toString(),
  status: faker.datatype.boolean() ? "flight_land" : "",
}));
</script>

<style></style>
