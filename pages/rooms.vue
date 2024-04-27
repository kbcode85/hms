<template>
  <div>
    <div class="row mb-2 mb-xl-3">
      <div class="col-auto d-none d-sm-block">
        <h3>Pokoje</h3>
      </div>
    </div>

    <div class="row">
      <div v-for="room in rooms" :key="room.id" class="col-md-4">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Pokój {{ room.number }}</h5>
            <p class="card-text"><strong>Standard:</strong> {{ room.type }}</p>

            <p class="card-text">
              <strong>Maksymalna liczba gości:</strong> {{ room.maxGuests }}
            </p>
            <p class="card-text">
              <strong>Cena:</strong> {{ room.pricePerNight }} PLN/noc
            </p>
            <div class="mb-3">
              <p class="card-text">
                <strong>Status:</strong> {{ room.status }}
              </p>
            </div>
            <div class="card-actions d-flex justify-content-end">
              <button
                class="btn btn-primary me-2"
                @click="store.openModal('edit')"
              >
                <i class="bi bi-pencil-square"></i> Edytuj
              </button>
              <button
                class="btn btn-danger me-2"
                @click="store.openModal('delete')"
              >
                <i class="bi bi-trash"></i> Usuń
              </button>
              <button class="btn btn-info" @click="store.openModal('info')">
                <i class="bi bi-info-circle"></i> Info
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="col-md-4">
        <div class="card">
          <div
            class="card-body d-flex justify-content-center align-items-center"
          >
            <button
              class="btn btn-success btn-lg"
              @click="store.openModal('add')"
            >
              <i class="bi bi-plus-lg"></i> Dodaj
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  middleware: ["auth"],
});

const store = useMyRoomStore();

const rooms = computed(() => store.$state.rooms);

onMounted(async () => {
  await store.fetchRooms();
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
