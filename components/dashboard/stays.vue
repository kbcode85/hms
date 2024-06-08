<template>
  <table v-if="stays > 0" class="table">
    <thead>
      <tr style="position: sticky; top: 0; background: white; z-index: 1">
        <th>Gość</th>
        <th class="text-right">Pokój</th>
      </tr>
    </thead>
    <tr
      v-for="(bookings, index) in stays"
      :key="index"
      :class="{ 'bg-light': index % 2 === 1 }"
    >
      <td>{{ bookings.guest.name + " " + bookings.guest.name }}</td>
      <td class="text-right">{{ bookings.room.number }}</td>
    </tr>
  </table>
  <div v-else class="d-flex justify-content-center align-items-center m-3 p-3">
    Brak pobytów.
  </div>
</template>

<script lang="ts" setup>
const store = useMyDashboardStore();

const stays = computed(() =>
  store.stays.filter((stay) => stay.status !== "CHECKED_OUT"),
);
</script>

<style></style>
