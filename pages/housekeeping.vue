<template>
  <div>
    <div class="row mb-2 mb-xl-3">
      <div class="col-auto d-none d-sm-block">
        <h3>Housekeeping</h3>
      </div>
    </div>

    <div class="row">
      <div class="mb-4">
        <input v-model="searchQuery" placeholder="Szukaj" type="input" />
      </div>
      <div style="overflow-y: auto; max-height: 900px">
        <table class="table">
          <thead>
            <tr>
              <th>Numer pokoju</th>
              <th>Typ</th>
              <th>Max os.</th>
              <th>Status</th>
              <th>Akcje</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="room in rooms"
              :key="room.id"
              class="animate__animated animate__fadeIn"
            >
              <td>{{ room.number }}</td>
              <td>{{ translateStandard(room.type) }}</td>
              <td>{{ room.maxGuests }}</td>
              <td>{{ translateStatus(room.status) }}</td>
              <td>
                <button
                  class="btn btn-primary me-2"
                  @click="store.openModal('clean', room.id)"
                >
                  <i class="bi bi-check-square"></i>
                </button>
                <button
                  class="btn btn-info"
                  @click="store.openModal('info', room.id)"
                >
                  <i class="bi bi-info-circle"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import "animate.css";
definePageMeta({
  middleware: ["auth"],
});

const store = useMyRoomStore();

const isModalOpen = computed(() => store.$state.isModalOpen);

const rooms = computed(() =>
  store.$state.rooms.filter((room) => room.status === "DIRTY"),
);

const searchQuery = ref("");

function translateStatus(status: string) {
  switch (status) {
    case "CLEAN":
      return "Czysty";
    case "DIRTY":
      return "Brudny";
    case "SERVICE":
      return "Serwis";
    case "OCCUPIED":
      return "Zajęty";
    case "ARRIVAL":
      return "Przyjazd";
    default:
      return status;
  }
}

function translateStandard(standard: string) {
  switch (standard) {
    case "ECONOMY":
      return "Ekonomiczny";
    case "STANDARD":
      return "Standardowy";
    case "LUXURY":
      return "Luksusowy";
    case "APARTMENT":
      return "Apartament";
    default:
      return standard;
  }
}
onMounted(async () => {
  await store.fetchRooms(searchQuery.value);
});

watch(isModalOpen, async (newVal, oldVal) => {
  if (oldVal === true && newVal === false) {
    await store.fetchRooms(searchQuery.value);
  }
});

watch([searchQuery], async () => {
  await store.fetchRooms(searchQuery.value);
});
</script>

<style>
.icon-with-text span {
  vertical-align: middle; /* Aby ikony były w linii z tekstem */
  margin-right: 4px; /* Odległość między ikoną a tekstem */
}

.icon-with-text {
  display: inline-block;
  margin-right: 10px; /* Odległość między grupami ikon */
}

.card-actions button {
  margin-top: 10px;
}
</style>
