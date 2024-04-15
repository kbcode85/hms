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
    <div class="col-xl-6 col-xxl-5 d-flex">
      <div class="w-100">
        <div class="row info">
          <div class="col-sm-6" v-for="card in cards" :key="card.title">
            <div class="card">
              <div class="card-body">
                <div class="row">
                  <div class="col mt-0">
                    <h5 class="card-title">{{ card.title }}</h5>
                  </div>
                  <div class="col-auto">
                    <div class="stat text-primary">
                      <i class="material-icons-sharp">{{ card.icon }}</i>
                    </div>
                  </div>
                </div>
                <h1 class="mt-1 mb-3">{{ card.value }}</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="col-xl-6 col-xxl-7">
      <div class="card flex-fill w-100">
        <div class="card-header">
          <div class="float-end">
            <form class="row g-2">
              <div class="col-auto">
                <select class="form-select form-select-sm bg-light border-0">
                  <option>Jan</option>
                  <option value="1">Feb</option>
                  <option value="2">Mar</option>
                  <option value="3">Apr</option>
                </select>
              </div>
            </form>
          </div>
          <h5 class="card-title mb-0">Rezerwacje</h5>
        </div>
        <div class="card-body pt-2 pb-3">
          <div class="chart chart-sm">
            <DashboardReservation />
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="row mt-5">
    <div class="col-sm-12 col-xl-6 col-xxl-4">
      <div class="card mb-4">
        <div class="card-header">
          <h5 class="card-title mb-0">Przyjazdy</h5>
        </div>
        <DashboardArrivals />
      </div>
    </div>

    <div class="col-sm-12 col-xl-6 col-xxl-4">
      <div class="card mb-4">
        <div class="card-header">
          <h5 class="card-title mb-0">Pobyty</h5>
        </div>
        <DashboardStays />
      </div>
    </div>

    <div class="col-sm-12 col-xl-6 col-xxl-4">
      <div class="card mb-4">
        <div class="card-header">
          <h5 class="card-title mb-0">Wyjazdy</h5>
        </div>
        <DashboardDepartures />
      </div>
    </div>

    <div class="col-sm-12 col-xl-6 col-xxl-4">
      <div class="card">
        <div class="card-header">
          <h5 class="card-title">Statystyki pokoi</h5>
        </div>
        <div class="card-body">
          <div class="chart chart-lg">
            <DashboardRooms />
          </div>
        </div>
      </div>
    </div>

    <div class="col-sm-12 col-xxl-8">
      <div class="card">
        <div class="card-header">
          <h5 class="card-title">Ostatnie rezerwacje</h5>
        </div>
        <div
          class="card-body"
          style="max-height: 340px; overflow-y: auto; padding: 0"
        >
          <table class="table">
            <thead>
              <tr
                style="position: sticky; top: 0; background: white; z-index: 1"
              >
                <th scope="col">Imię i nazwisko</th>
                <th scope="col">Numer pokoju</th>
                <th scope="col">Data rozpoczęcia</th>
                <th scope="col">Data zakończenia</th>
                <th scope="col">Cena</th>
                <th scope="col">Zapłacono</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="reservation in res" :key="reservation.name">
                <td>{{ reservation.name }}</td>
                <td>{{ reservation.roomNumber }}</td>
                <td>
                  {{ new Date(reservation.startDate).toLocaleDateString() }}
                </td>
                <td>
                  {{ new Date(reservation.endDate).toLocaleDateString() }}
                </td>
                <td>{{ reservation.price }}</td>
                <td>{{ reservation.isPaid ? "Tak" : "Nie" }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  middleware: ["auth"],
});

const cards = [
  { title: "Pobyty", value: "124", icon: "hotel", data: "data1" },
  { title: "Przyjazdy", value: "50", icon: "flight_land", data: "data2" },
  { title: "Wyjazdy", value: "90", icon: "flight_takeoff", data: "data3" },
  { title: "Rezerwacje", value: "54", icon: "fiber_new", data: "data4" },
];

import { faker } from "@faker-js/faker";
interface Reservation {
  name: string;
  roomNumber: string;
  startDate: string;
  endDate: string;
  price: number;
  isPaid: boolean;
  status?: string;
}

const res: Reservation[] = Array.from({ length: 30 }, () => ({
  name: faker.person.fullName(),
  roomNumber: faker.number.int({ min: 100, max: 200 }).toString(),
  startDate: faker.date.past().toISOString(),
  endDate: faker.date.future().toISOString(),
  price: parseFloat(faker.commerce.price()),
  isPaid: faker.datatype.boolean(),
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

.stat {
  align-items: center;
  background: #d3e2f7;
  border-radius: 50%;
  color: #3b7ddd;
  display: flex;
  height: 40px;
  justify-content: center;
  width: 40px;
}

.text-primary {
  color: rgba(59, 125, 221), 1;
}

.card-title {
  color: #939ba2;
  font-size: 0.925rem;
  font-weight: 600;
}

.mb-3 {
  margin-bottom: 1rem !important;
}
.mt-1 {
  margin-top: 0.25rem !important;
}

.card {
  box-shadow: 0 0 0.875rem 0 rgba(33, 37, 41, 0.05);
  margin-bottom: 24px;
}
.card-header {
  border-bottom-width: 1px;
  padding: 1rem 1.25rem;
}

.card-title {
  color: #939ba2;
  font-size: 0.925rem;
  font-weight: 600;
}
.mb-0 {
  margin-bottom: 0 !important;
}
.flex-fill {
  flex: 1 1 auto !important;
}

.pb-3 {
  padding-bottom: 1rem !important;
}
.pt-2 {
  padding-top: 0.5rem !important;
}

.card-body {
  flex: 1 1 auto;
  padding: 1.25rem 1.25rem;
}

.w-100 {
  width: 100% !important;
}

.chart {
  margin: auto;
  min-height: 209px;
  position: relative;
  width: 100%;
}
</style>
