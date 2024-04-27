<template>
  <div class="overlay" :class="{ active: isOpen }" @click="store.closeModal">
    <div
      class="modal fade"
      :class="{ show: isOpen }"
      :style="{ display: isOpen ? 'block' : 'none' }"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div v-if="store.$state.activeAction === `info`">
            <div class="modal-header">
              <h5 class="modal-title">
                Informacje o pokoju {{ room?.number }}
              </h5>
              <button
                type="button"
                class="btn-close"
                @click="store.closeModal"
              ></button>
            </div>
            <div class="modal-body">
              <div v-if="room">
                <p class="card-text">
                  <strong>Wyposażenie: </strong>
                  <span v-if="room.equipment.hasWifi" class="icon-with-text">
                    <span class="material-icons-sharp">wifi</span> Wi-Fi
                  </span>
                  <span v-if="room.equipment.hasTV" class="icon-with-text">
                    <span class="material-icons-sharp">tv</span> TV
                  </span>
                  <span v-if="room.equipment.hasKitchen" class="icon-with-text">
                    <span class="material-icons-sharp">kitchen</span> Kuchnia
                  </span>
                  <span v-if="room.equipment.hasFridge" class="icon-with-text">
                    <span class="material-icons-sharp">kitchen</span> Lodówka
                  </span>
                  <span v-if="room.equipment.hasBalcony" class="icon-with-text">
                    <span class="material-icons-sharp">deck</span> Balkon
                  </span>
                  <span
                    v-if="room.equipment.hasAirConditioning"
                    class="icon-with-text"
                  >
                    <span class="material-icons-sharp">ac_unit</span>
                    Klimatyzacja
                  </span>
                  <span
                    v-if="room.equipment.hasWardrobe"
                    class="icon-with-text"
                  >
                    <span class="material-icons-sharp">checkroom</span> Szafa
                  </span>
                  <span
                    v-if="room.equipment.hasHairDryer"
                    class="icon-with-text"
                  >
                    <span class="material-icons-sharp">dry</span> Suszarka
                  </span>
                  <span
                    v-if="room.equipment.hasCoffeeAndTeaSet"
                    class="icon-with-text"
                  >
                    <span class="material-icons-sharp">coffee_maker</span>
                    Zestaw do kawy/herbaty
                  </span>
                  <span
                    v-if="room.equipment.hasCosmetics"
                    class="icon-with-text"
                  >
                    <span class="material-icons-sharp">spa</span> Kosmetyki
                  </span>
                  <span v-if="room.equipment.hasTowels" class="icon-with-text">
                    <span class="material-icons-sharp">clean_hands</span>
                    Ręczniki
                  </span>
                </p>
                <p class="card-text d-flex flex-column">
                  <strong>Typ łazienki:</strong>
                  <span
                    v-if="room.equipment.bathroomType === 'SHOWER'"
                    class="icon-with-text"
                  >
                    <span class="material-icons-sharp">shower</span> Prysznic
                  </span>
                  <span
                    v-if="room.equipment.bathroomType === 'BATHTUB'"
                    class="icon-with-text"
                  >
                    <span class="material-icons-sharp">bathtub</span> Wanna
                  </span>
                  <span
                    v-if="room.equipment.bathroomType === 'BOTH'"
                    class="icon-with-text"
                  >
                    <span class="material-icons-sharp">bathtub shower</span>
                    Wanna i prysznic
                  </span>
                </p>
                <p class="card-text d-flex flex-column">
                  <strong>Łóżka:</strong>
                  <span v-if="room.equipment.singleBeds" class="icon-with-text">
                    <span class="material-icons-sharp">single_bed</span>
                    {{ room.equipment.singleBeds }} łóżko/a pojedyncze
                  </span>
                  <span v-if="room.equipment.doubleBeds" class="icon-with-text">
                    <span class="material-icons-sharp">king_bed</span>
                    {{ room.equipment.doubleBeds }} łóżko/a podwójne
                  </span>
                </p>
              </div>
              <div v-else>
                <p>Nie znaleziono pokoju.</p>
              </div>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                @click="store.closeModal"
              >
                Zamknij
              </button>
            </div>
          </div>

          <div v-if="store.$state.activeAction === `delete`">
            <div class="modal-header">
              <h5 class="modal-title">Usunięcie pokoju</h5>
              <button
                type="button"
                class="btn-close"
                @click="store.closeModal"
              ></button>
            </div>
            <div class="modal-body">
              <p>Czy na pewno chcesz usunąć pokój {{ room?.number }}?</p>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                @click="store.closeModal"
              >
                Nie
              </button>
              <button
                type="button"
                class="btn btn-danger"
                @click="store.deleteRoom(room?.id)"
              >
                Tak
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const store = useMyRoomStore();

const isOpen = computed(() => store.$state.isModalOpen);

const room = computed(() => {
  return store.rooms.find((r) => r.id === store.roomId);
});
</script>

<style lang="scss">
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: -1;
  opacity: 0;
  transition: opacity 0.35s ease-in-out;
}

.overlay.active {
  opacity: 1;
  z-index: 0;
}
</style>
