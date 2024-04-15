<template>
  <div class="row mb-2 mb-xl-3">
    <div class="col-auto d-none d-sm-block">
      <h3>Dashboard</h3>
    </div>

    <div class="col-auto ms-auto text-end mt-n1">
      <a href="#" class="btn btn-primary d-flex align-items-center gap-2">
        Odswieź <span class="material-icons-sharp">refresh</span>
      </a>
    </div>
  </div>

  <div class="row">
    <div
      class="col-12 col-md-6 col-xxl-3 d-flex mb-3 mb-xxl-0"
      v-for="card in cards"
      :key="card.title"
    >
      <div class="card flex-fill hover-shadow hover-scale">
        <div class="card-body py-4">
          <div class="d-flex justify-content-between">
            <div>
              <h3 class="mb-2">{{ card.value }}</h3>
              <h6 class="mb-0">{{ card.title }}</h6>
            </div>

            <div class="d-flex align-items-center">
              <div
                class="rounded-circle d-flex justify-content-center align-items-center hover-shadow hover-scale"
                style="
                  width: 40px;
                  height: 40px;
                  background-color: rgba(29, 45, 64, 0.8);
                "
              >
                <i class="material-icons-sharp text-light">{{ card.icon }}</i>
              </div>
              <div
                class="chart chart-xxl"
                :data-ct-chart-line="card.data"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="row mt-4">
    <div class="col-sm">
      <div class="card">
        <div class="card-header">Przyjazdy</div>
        <div
          class="card-body"
          style="max-height: 400px; overflow-y: auto; padding: 0"
        >
          <table class="table">
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
      </div>
    </div>

    <div class="col-sm">
      <div class="card">
        <div class="card-header">Pobyty</div>
        <div
          class="card-body"
          style="max-height: 400px; overflow-y: auto; padding: 0"
        >
          <table class="table">
            <tr
              v-for="(guest, index) in guests_stay"
              :key="index"
              :class="{ 'bg-light': index % 2 === 1 }"
            >
              <td>{{ guest.name }}</td>
              <td class="text-right">{{ guest.roomNumber }}</td>
            </tr>
          </table>
        </div>
      </div>
    </div>

    <div class="col-sm">
      <div class="card">
        <div class="card-header">Wyjazdy</div>
        <div
          class="card-body"
          style="max-height: 400px; overflow-y: auto; padding: 0"
        >
          <table class="table">
            <tr
              v-for="(guest, index) in guests_departure"
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
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { faker } from "@faker-js/faker";
definePageMeta({
  middleware: ["auth"],
});

interface Guest {
  name: string;
  roomNumber: string;
  status?: string;
}

const cards = [
  { title: "Pobyty", value: "124", icon: "hotel", data: "data1" },
  { title: "Przyjazdy", value: "50", icon: "flight_land", data: "data2" },
  { title: "Wyjazdy", value: "90", icon: "flight_takeoff", data: "data3" },
  { title: "Nowe rezerwacje", value: "54", icon: "fiber_new", data: "data4" },
];

const guests_arrival: Guest[] = Array.from({ length: 30 }, () => ({
  name: faker.person.fullName(),
  roomNumber: faker.number.int({ min: 100, max: 200 }).toString(),
  status: faker.datatype.boolean() ? "flight_land" : "",
}));

const guests_stay: Guest[] = Array.from({ length: 30 }, () => ({
  name: faker.person.fullName(),
  roomNumber: faker.number.int({ min: 100, max: 200 }).toString(),
}));

const guests_departure: Guest[] = Array.from({ length: 30 }, () => ({
  name: faker.person.fullName(),
  roomNumber: faker.number.int({ min: 100, max: 200 }).toString(),
  status: faker.datatype.boolean() ? "flight_takeoff" : "",
}));
</script>

<style>
.hover-shadow:hover {
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15) !important;
  transition: box-shadow 0.3s ease;
}
.hover-scale:hover {
  transform: scale(1.1);
  transition: transform 0.3s ease;
}

tr {
  border-bottom: 1px solid #ccc;

  td {
    padding: 10px;

    .material-icons-sharp {
      background: transparent;
      color: #272924;
    }
  }
}
</style>
