<template>
  <div class="overlay" :class="{ active: isOpen }">
    <div
      class="modal fade"
      :class="{ show: isOpen }"
      :style="{ display: isOpen ? 'block' : 'none' }"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div v-if="action === 'info'">
            <div class="modal-header">
              <h5 class="modal-title">Informacje o pokoju {{ room.number }}</h5>
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
                  <span class="m-1">
                    <span v-if="equipment.hasWifi" class="icon-with-text">
                      <span class="material-icons-sharp">wifi</span> Wi-Fi
                    </span>
                    <span v-if="equipment.hasTV" class="icon-with-text">
                      <span class="material-icons-sharp">tv</span> TV
                    </span>
                    <span v-if="equipment.hasKitchen" class="icon-with-text">
                      <span class="material-icons-sharp">kitchen</span> Kuchnia
                    </span>
                    <span v-if="equipment.hasFridge" class="icon-with-text">
                      <span class="material-icons-sharp">kitchen</span> Lodówka
                    </span>
                    <span v-if="equipment.hasBalcony" class="icon-with-text">
                      <span class="material-icons-sharp">deck</span> Balkon
                    </span>
                    <span
                      v-if="equipment.hasAirConditioning"
                      class="icon-with-text"
                    >
                      <span class="material-icons-sharp">ac_unit</span>
                      Klimatyzacja
                    </span>
                    <span v-if="equipment.hasWardrobe" class="icon-with-text">
                      <span class="material-icons-sharp">checkroom</span> Szafa
                    </span>
                    <span v-if="equipment.hasHairDryer" class="icon-with-text">
                      <span class="material-icons-sharp">dry</span> Suszarka
                    </span>
                    <span
                      v-if="equipment.hasCoffeeAndTeaSet"
                      class="icon-with-text"
                    >
                      <span class="material-icons-sharp">coffee_maker</span>
                      Zestaw do kawy/herbaty
                    </span>
                    <span v-if="equipment.hasCosmetics" class="icon-with-text">
                      <span class="material-icons-sharp">spa</span> Kosmetyki
                    </span>
                    <span v-if="equipment.hasTowels" class="icon-with-text">
                      <span class="material-icons-sharp">clean_hands</span>
                      Ręczniki
                    </span>
                  </span>
                </p>
                <p
                  v-if="equipment.hasBathroom"
                  class="card-text d-flex flex-column"
                >
                  <strong>Łazienka: </strong>
                  <span
                    v-if="equipment.bathroomType === 'SHOWER'"
                    class="icon-with-text"
                  >
                    <span class="material-icons-sharp">shower</span> Prysznic
                  </span>
                  <span
                    v-if="equipment.bathroomType === 'BATHTUB'"
                    class="icon-with-text"
                  >
                    <span class="material-icons-sharp">bathtub</span> Wanna
                  </span>
                  <span
                    v-if="equipment.bathroomType === 'BOTH'"
                    class="icon-with-text"
                  >
                    <span class="material-icons-sharp">bathtub shower</span>
                    Wanna i prysznic
                  </span>
                </p>
                <p class="card-text d-flex flex-column">
                  <strong>Łóżka:</strong>
                  <span v-if="equipment.singleBeds" class="icon-with-text">
                    <span class="material-icons-sharp">single_bed</span>
                    {{ equipment.singleBeds }} łóżko/a pojedyncze
                  </span>
                  <span v-if="equipment.doubleBeds" class="icon-with-text">
                    <span class="material-icons-sharp">king_bed</span>
                    {{ equipment.doubleBeds }} łóżko/a podwójne
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

          <div v-if="action === 'delete'">
            <div class="modal-header">
              <h5 class="modal-title">Usunięcie pokoju</h5>
              <button
                type="button"
                class="btn-close"
                @click="store.closeModal"
              ></button>
            </div>
            <div class="modal-body">
              <p>Czy na pewno chcesz usunąć pokój {{ room.number }}?</p>
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
                @click="store.deleteRoom(room.id)"
              >
                Tak
              </button>
            </div>
          </div>

          <div v-if="action === 'clean'">
            <div class="modal-header">
              <h5 class="modal-title">Zmiana statusu</h5>
              <button
                type="button"
                class="btn-close"
                @click="store.closeModal"
              ></button>
            </div>
            <div class="modal-body">
              <p>
                Czy na pewno chcesz zmienić status pokoju {{ room.number }} na
                czysty ?
              </p>
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
                @click="store.editRoom(room.id, RoomStatus.CLEAN)"
              >
                Tak
              </button>
            </div>
          </div>

          <div v-if="action === 'edit'">
            <div class="modal-header">
              <h5 class="modal-title">Edycja pokoju</h5>
              <button
                type="button"
                class="btn-close"
                @click="store.closeModal"
              ></button>
            </div>
            <div class="modal-body">
              <form>
                <div class="col-12 mb-3">
                  <label for="name">Numer pokoju:</label>
                  <input
                    id="name"
                    v-model="room.number"
                    type="text"
                    class="form-control"
                    required
                  />
                </div>
                <div class="col-12 mb-3">
                  <label for="type">Typ pokoju:</label>
                  <select
                    id="type"
                    v-model="room.type"
                    class="form-control"
                    required
                  >
                    <option disabled value="">Wybierz typ pokoju</option>
                    <option
                      v-for="types in roomStandards"
                      :key="types"
                      :value="types"
                    >
                      {{ translateStandard(types) }}
                    </option>
                  </select>
                </div>

                <div class="col-12 mb-3">
                  <label for="maxGuests">Maksymalna liczba gości:</label>
                  <input
                    id="maxGuests"
                    v-model.number="room.maxGuests"
                    type="number"
                    min="1"
                    class="form-control"
                    required
                  />
                </div>

                <div class="col-12 mb-3">
                  <label for="pricePerNight">Cena za noc:</label>
                  <input
                    id="pricePerNight"
                    v-model.number="room.pricePerNight"
                    type="number"
                    min="0"
                    class="form-control"
                    required
                  />
                </div>

                <div class="col-12 mb-3">
                  <label for="status">Status pokoju:</label>
                  <select
                    id="status"
                    v-model="room.status"
                    class="form-control"
                    required
                  >
                    <option disabled value="">Wybierz status pokoju</option>
                    <option
                      v-for="status in roomStatuses"
                      :key="status"
                      :value="status"
                    >
                      {{ translateStatus(status) }}
                    </option>
                  </select>
                </div>

                <div class="col-12 mb-3">
                  <label for="singleBeds">Liczba pojedynczych łóżek:</label>
                  <input
                    id="singleBeds"
                    v-model.number="equipment.singleBeds"
                    type="number"
                    min="0"
                    class="form-control"
                    required
                  />
                </div>

                <div class="col-12 mb-3">
                  <label for="doubleBeds">Liczba podwójnych łóżek:</label>
                  <input
                    id="doubleBeds"
                    v-model.number="equipment.doubleBeds"
                    type="number"
                    min="0"
                    class="form-control"
                    required
                  />
                </div>

                <div class="col-12 mb-3 d-flex justify-content-between">
                  <label for="hasTV">Czy pokój ma telewizor?</label>
                  <input id="hasTV" v-model="equipment.hasTV" type="checkbox" />
                </div>

                <div class="col-12 mb-3 d-flex justify-content-between">
                  <label for="hasWifi">Czy pokój ma Wifi?</label>
                  <input
                    id="hasWifi"
                    v-model="equipment.hasWifi"
                    type="checkbox"
                  />
                </div>
                <div class="col-12 mb-3 d-flex justify-content-between">
                  <label for="hasBathroom">Czy pokój ma łazienkę?</label>
                  <input
                    id="hasBathroom"
                    v-model="equipment.hasBathroom"
                    type="checkbox"
                  />
                </div>
                <div class="col-12 mb-3 d-flex justify-content-between">
                  <label for="hasKitchen">Czy pokój ma kuchnię?</label>
                  <input
                    id="hasKitchen"
                    v-model="equipment.hasKitchen"
                    type="checkbox"
                  />
                </div>
                <div class="col-12 mb-3 d-flex justify-content-between">
                  <label for="hasFridge">Czy pokój ma lodówkę?</label>
                  <input
                    id="hasFridge"
                    v-model="equipment.hasFridge"
                    type="checkbox"
                  />
                </div>
                <div class="col-12 mb-3 d-flex justify-content-between">
                  <label for="hasBalcony">Czy pokój ma balkon?</label>
                  <input
                    id="hasBalcony"
                    v-model="equipment.hasBalcony"
                    type="checkbox"
                  />
                </div>
                <div class="col-12 mb-3 d-flex justify-content-between">
                  <label for="hasAirConditioning"
                    >Czy pokój ma klimatyzację?</label
                  >
                  <input
                    id="hasAirConditioning"
                    v-model="equipment.hasAirConditioning"
                    type="checkbox"
                  />
                </div>
                <div class="col-12 mb-3 d-flex justify-content-between">
                  <label for="hasWardrobe">Czy pokój ma szafę?</label>
                  <input
                    id="hasWardrobe"
                    v-model="equipment.hasWardrobe"
                    type="checkbox"
                  />
                </div>
                <div class="col-12 mb-3 d-flex justify-content-between">
                  <label for="hasHairDryer">Czy pokój ma suszarkę?</label>
                  <input
                    id="hasHairDryer"
                    v-model="equipment.hasHairDryer"
                    type="checkbox"
                  />
                </div>
                <div class="col-12 mb-3 d-flex justify-content-between">
                  <label for="hasCoffeeAndTeaSet"
                    >Czy pokój ma zestaw do kawy i herbaty?</label
                  >
                  <input
                    id="hasCoffeeAndTeaSet"
                    v-model="equipment.hasCoffeeAndTeaSet"
                    type="checkbox"
                  />
                </div>
                <div class="col-12 mb-3 d-flex justify-content-between">
                  <label for="hasCosmetics">Czy pokój ma kosmetyki?</label>
                  <input
                    id="hasCosmetics"
                    v-model="equipment.hasCosmetics"
                    type="checkbox"
                  />
                </div>
                <div class="col-12 mb-3 d-flex justify-content-between">
                  <label for="hasTowels">Czy pokój ma ręczniki?</label>
                  <input
                    id="hasTowels"
                    v-model="equipment.hasTowels"
                    type="checkbox"
                  />
                </div>
                <div class="col-12 mb-3">
                  <label for="bathroomType">Typ łazienki:</label>
                  <select
                    id="bathroomType"
                    v-model="equipment.bathroomType"
                    class="form-control"
                    required
                  >
                    <option disabled value="">Wybierz typ łazienki</option>
                    <option
                      v-for="types in bathroomTypes"
                      :key="types"
                      :value="types"
                    >
                      {{ types }}
                    </option>
                  </select>
                </div>
              </form>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                @click="store.closeModal"
              >
                Anuluj
              </button>
              <button
                type="button"
                class="btn btn-success"
                @click="store.editRoom(room.id)"
              >
                Edytuj
              </button>
            </div>
          </div>

          <div v-if="action === 'add'">
            <div class="modal-header">
              <h5 class="modal-title">Dodanie pokoju</h5>
              <button
                type="button"
                class="btn-close"
                @click="store.closeModal"
              ></button>
            </div>
            <div class="modal-body">
              <form>
                <div class="col-12 mb-3">
                  <label for="name">Numer pokoju:</label>
                  <input
                    id="name"
                    v-model="room.number"
                    type="text"
                    class="form-control"
                    required
                  />
                </div>
                <div class="col-12 mb-3">
                  <label for="type">Typ pokoju:</label>
                  <select
                    id="type"
                    v-model="room.type"
                    class="form-control"
                    required
                  >
                    <option disabled value="">Wybierz typ pokoju</option>
                    <option
                      v-for="types in roomStandards"
                      :key="types"
                      :value="types"
                    >
                      {{ translateStandard(types) }}
                    </option>
                  </select>
                </div>

                <div class="col-12 mb-3">
                  <label for="maxGuests">Maksymalna liczba gości:</label>
                  <input
                    id="maxGuests"
                    v-model.number="room.maxGuests"
                    type="number"
                    min="1"
                    class="form-control"
                    required
                  />
                </div>

                <div class="col-12 mb-3">
                  <label for="pricePerNight">Cena za noc:</label>
                  <input
                    id="pricePerNight"
                    v-model.number="room.pricePerNight"
                    type="number"
                    min="0"
                    class="form-control"
                    required
                  />
                </div>

                <div class="col-12 mb-3">
                  <label for="status">Status pokoju:</label>
                  <select
                    id="status"
                    v-model="room.status"
                    class="form-control"
                    required
                  >
                    <option disabled value="">Wybierz status pokoju</option>
                    <option
                      v-for="status in roomStatuses"
                      :key="status"
                      :value="status"
                    >
                      {{ translateStatus(status) }}
                    </option>
                  </select>
                </div>

                <div class="col-12 mb-3">
                  <label for="singleBeds">Liczba pojedynczych łóżek:</label>
                  <input
                    id="singleBeds"
                    v-model.number="equipment.singleBeds"
                    type="number"
                    min="0"
                    class="form-control"
                    required
                  />
                </div>

                <div class="col-12 mb-3">
                  <label for="doubleBeds">Liczba podwójnych łóżek:</label>
                  <input
                    id="doubleBeds"
                    v-model.number="equipment.doubleBeds"
                    type="number"
                    min="0"
                    class="form-control"
                    required
                  />
                </div>

                <div class="col-12 mb-3 d-flex justify-content-between">
                  <label for="hasTV">Czy pokój ma telewizor?</label>
                  <input id="hasTV" v-model="equipment.hasTV" type="checkbox" />
                </div>

                <div class="col-12 mb-3 d-flex justify-content-between">
                  <label for="hasWifi">Czy pokój ma Wifi?</label>
                  <input
                    id="hasWifi"
                    v-model="equipment.hasWifi"
                    type="checkbox"
                  />
                </div>
                <div class="col-12 mb-3 d-flex justify-content-between">
                  <label for="hasBathroom">Czy pokój ma łazienkę?</label>
                  <input
                    id="hasBathroom"
                    v-model="equipment.hasBathroom"
                    type="checkbox"
                  />
                </div>
                <div class="col-12 mb-3 d-flex justify-content-between">
                  <label for="hasKitchen">Czy pokój ma kuchnię?</label>
                  <input
                    id="hasKitchen"
                    v-model="equipment.hasKitchen"
                    type="checkbox"
                  />
                </div>
                <div class="col-12 mb-3 d-flex justify-content-between">
                  <label for="hasFridge">Czy pokój ma lodówkę?</label>
                  <input
                    id="hasFridge"
                    v-model="equipment.hasFridge"
                    type="checkbox"
                  />
                </div>
                <div class="col-12 mb-3 d-flex justify-content-between">
                  <label for="hasBalcony">Czy pokój ma balkon?</label>
                  <input
                    id="hasBalcony"
                    v-model="equipment.hasBalcony"
                    type="checkbox"
                  />
                </div>
                <div class="col-12 mb-3 d-flex justify-content-between">
                  <label for="hasAirConditioning"
                    >Czy pokój ma klimatyzację?</label
                  >
                  <input
                    id="hasAirConditioning"
                    v-model="equipment.hasAirConditioning"
                    type="checkbox"
                  />
                </div>
                <div class="col-12 mb-3 d-flex justify-content-between">
                  <label for="hasWardrobe">Czy pokój ma szafę?</label>
                  <input
                    id="hasWardrobe"
                    v-model="equipment.hasWardrobe"
                    type="checkbox"
                  />
                </div>
                <div class="col-12 mb-3 d-flex justify-content-between">
                  <label for="hasHairDryer">Czy pokój ma suszarkę?</label>
                  <input
                    id="hasHairDryer"
                    v-model="equipment.hasHairDryer"
                    type="checkbox"
                  />
                </div>
                <div class="col-12 mb-3 d-flex justify-content-between">
                  <label for="hasCoffeeAndTeaSet"
                    >Czy pokój ma zestaw do kawy i herbaty?</label
                  >
                  <input
                    id="hasCoffeeAndTeaSet"
                    v-model="equipment.hasCoffeeAndTeaSet"
                    type="checkbox"
                  />
                </div>
                <div class="col-12 mb-3 d-flex justify-content-between">
                  <label for="hasCosmetics">Czy pokój ma kosmetyki?</label>
                  <input
                    id="hasCosmetics"
                    v-model="equipment.hasCosmetics"
                    type="checkbox"
                  />
                </div>
                <div class="col-12 mb-3 d-flex justify-content-between">
                  <label for="hasTowels">Czy pokój ma ręczniki?</label>
                  <input
                    id="hasTowels"
                    v-model="equipment.hasTowels"
                    type="checkbox"
                  />
                </div>
                <div class="col-12 mb-3">
                  <label for="bathroomType">Typ łazienki:</label>
                  <select
                    id="bathroomType"
                    v-model="equipment.bathroomType"
                    class="form-control"
                    required
                  >
                    <option disabled value="">Wybierz typ łazienki</option>
                    <option
                      v-for="types in bathroomTypes"
                      :key="types"
                      :value="types"
                    >
                      {{ types }}
                    </option>
                  </select>
                </div>
              </form>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                @click="store.closeModal"
              >
                Anuluj
              </button>
              <button
                type="button"
                class="btn btn-success"
                @click="store.addRoom()"
              >
                Dodaj
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { RoomStatus, RoomStandard, BathroomType } from "~/server/models/room";
const store = useMyRoomStore();

const isOpen = computed(() => store.$state.isModalOpen);

const action = computed(() => store.activeAction);

const room = computed(() => store.$state.room);

const equipment = computed(() => store.$state.equipment);

const roomStandards = Object.values(RoomStandard);
const roomStatuses = Object.values(RoomStatus);
const bathroomTypes = Object.values(BathroomType);

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
</script>

<style lang="scss">
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: -2;
  opacity: 0;
  transition: opacity 0.35s ease-in-out;
}

.overlay.active {
  opacity: 1;
  z-index: 0;
}
</style>
