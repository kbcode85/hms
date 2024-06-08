<template>
  <table v-if="staysForToday.length > 0" class="table">
    <thead>
      <tr style="position: sticky; top: 0; background: white; z-index: 1">
        <th>Gość</th>
        <th class="text-right">Pokój</th>
        <th class="text-right">Status</th>
      </tr>
    </thead>
    <tr
      v-for="(bookings, index) in staysForToday"
      :key="index"
      :class="{ 'bg-light': index % 2 === 1 }"
    >
      <td>{{ bookings.guest.name + " " + bookings.guest.name }}</td>
      <td class="text-right">{{ bookings.room.number }}</td>
      <td class="text-right">
        <i
          v-if="bookings.status === 'CHECKED_OUT'"
          class="material-icons-sharp"
          style="color: #2ca58d"
          >check_circle</i
        >
      </td>
    </tr>
  </table>
  <div v-else class="d-flex justify-content-center align-items-center m-3 p-3">
    Brak wyjazdów na dzisiaj.
  </div>
</template>

<script lang="ts" setup>
const store = useMyDashboardStore();
const today = ref(formatDate(new Date()));
function formatDate(date: Date | string): string {
  const d = new Date(date);
  let month = "" + (d.getMonth() + 1);
  let day = "" + d.getDate();
  const year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
}

const staysForToday = computed(() =>
  store.stays.filter((booking) => booking.endDate === today.value),
);
</script>

<style></style>
