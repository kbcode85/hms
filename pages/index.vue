<template>
  <div>
    <div class="row mb-2 mb-xl-3">
      <div class="col-auto d-none d-sm-block">
        <h3>Dashboard</h3>
        <p>Dzisiaj jest {{ currentDay }} {{ currentDate }}</p>
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
            <div v-for="card in cards" :key="card.id" class="col-sm-6">
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

    <div class="row mt-2">
      <div class="col-sm-12 col-xl-6 col-xxl-4">
        <div class="card">
          <div class="card-header">
            <h5 class="card-title">Przyjazdy</h5>
          </div>
          <div class="card-body p-0 pre-scrollable">
            <div class="chart chart-lg">
              <DashboardArrivals />
            </div>
          </div>
        </div>
      </div>

      <div class="col-sm-12 col-xl-6 col-xxl-4">
        <div class="card">
          <div class="card-header">
            <h5 class="card-title">Pobyty</h5>
          </div>
          <div class="card-body p-0 pre-scrollable">
            <div class="chart chart-lg">
              <DashboardStays />
            </div>
          </div>
        </div>
      </div>

      <div class="col-sm-12 col-xl-6 col-xxl-4">
        <div class="card">
          <div class="card-header">
            <h5 class="card-title">Wyjazdy</h5>
          </div>
          <div class="card-body p-0 pre-scrollable">
            <div class="chart chart-lg">
              <DashboardDepartures />
            </div>
          </div>
        </div>
      </div>

      <div class="col-sm-12 col-xl-6 col-xxl-4">
        <div class="card">
          <div class="card-header">
            <h5 class="card-title">Pokoje</h5>
          </div>
          <div class="card-body p-0 chart-room">
            <div class="chart chart-lg">
              <DashboardRooms />
            </div>
          </div>
        </div>
      </div>

      <div class="col-sm-12 col-xxl-8">
        <div class="card">
          <div class="card-header">
            <h5 class="card-title">Rezerwacje</h5>
          </div>
          <div
            class="card-body"
            style="height: 340px; overflow-y: auto; padding: 0"
          >
            <table v-if="store.newBookings.length > 0" class="table">
              <thead>
                <tr
                  style="
                    position: sticky;
                    top: 0;
                    background: white;
                    z-index: 1;
                  "
                >
                  <th scope="col">Gość</th>
                  <th scope="col">Pokój</th>
                  <th scope="col">Przyjazd</th>
                  <th scope="col">Wyjazd</th>
                  <th scope="col">Cena</th>
                  <th scope="col">Status</th>
                </tr>
              </thead>
              <tr
                v-for="(booking, index) in store.newBookings"
                :key="index"
                :class="{ 'bg-light': index % 2 === 1 }"
              >
                <td>{{ booking.guest.name + " " + booking.guest.surname }}</td>
                <td>{{ booking.room.number }}</td>
                <td>
                  {{ new Date(booking.startDate).toLocaleDateString() }}
                </td>
                <td>
                  {{ new Date(booking.endDate).toLocaleDateString() }}
                </td>
                <td>{{ booking.price + " PLN" }}</td>
                <td>{{ translateStatus(booking.status) }}</td>
              </tr>
            </table>
            <div
              v-else
              class="d-flex justify-content-center align-items-center m-3 p-3"
            >
              Brak przyszłych rezerwacji.
            </div>
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

const store = useMyDashboardStore();

const today = ref(formatDate(new Date()));

const staysCount = computed(
  () => store.stays.filter((stay) => stay.status !== "CHECKED_OUT").length,
);
const arrivalsCount = computed(
  () =>
    store.arrivals.filter((arrival) => arrival.status !== "CHECKED_IN").length,
);
const newBookingsCount = computed(() => store.newBookings.length);

const departuresCount = computed(() => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return store.stays.filter((booking) => {
    const bookingEndDate = new Date(booking.endDate);
    bookingEndDate.setHours(0, 0, 0, 0);

    return (
      bookingEndDate.getTime() === today.getTime() &&
      booking.status === "CHECKED_IN"
    );
  }).length;
});

const cards = [
  { id: 1, title: "Pobyty", value: staysCount, icon: "hotel", data: "data1" },
  {
    id: 2,
    title: "Przyjazdy",
    value: arrivalsCount,
    icon: "flight_land",
    data: "data2",
  },
  {
    id: 3,
    title: "Wyjazdy",
    value: departuresCount,
    icon: "flight_takeoff",
    data: "data3",
  },
  {
    id: 4,
    title: "Rezerwacje",
    value: newBookingsCount,
    icon: "fiber_new",
    data: "data4",
  },
];

const date = new Date();
const days = [
  "niedziela",
  "poniedziałek",
  "wtorek",
  "środa",
  "czwartek",
  "piątek",
  "sobota",
];

const currentDay = days[date.getDay()];
const currentDate = date.toLocaleDateString();

function formatDate(date: Date | string): string {
  const d = new Date(date);
  let month = "" + (d.getMonth() + 1);
  let day = "" + d.getDate();
  const year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
}

const nextDay = ref(
  formatDate(new Date(new Date().getTime() + 24 * 60 * 60 * 1000)),
);

function startOfWeek(date: Date): Date {
  const diff = date.getDate() - date.getDay() + (date.getDay() === 0 ? -6 : 1);
  return new Date(date.setDate(diff));
}

function endOfWeek(date: Date): Date {
  const start = startOfWeek(date);
  return new Date(start.setDate(start.getDate() + 6));
}

function translateStatus(status: string): string {
  switch (status) {
    case "PENDING":
      return "Oczekująca";
    case "CONFIRMED":
      return "Potwierdzona";
    case "GUARANTEED":
      return "Gwarantowana";
    case "CANCELED":
      return "Anulowana";
    case "CHECKED_IN":
      return "Zameldowana";
    case "CHECKED_OUT":
      return "Wymeldowana";
    default:
      return status;
  }
}

const startOfThisWeek = ref(startOfWeek(new Date()));
const endOfThisWeek = ref(endOfWeek(new Date()));

onMounted(async () => {
  await Promise.all([
    store.fetchRooms(),
    store.fetchNoShows(),
    store.fetchStays(["CHECKED_IN,CHECKED_OUT"]),
    store.fetchTodayArrivals(
      ["GUARANTEED,CONFIRMED,CHECKED_IN"],
      today.value,
      today.value,
    ),
    store.fetchNewBookings(["GUARANTEED,CONFIRMED,PENDING"], nextDay.value),
    store.fetchWeeklyBookings(
      ["GUARANTEED,CONFIRMED,PENDING,CANCELED"],
      formatDate(startOfThisWeek.value),
      formatDate(endOfThisWeek.value),
    ),
    store.updateRoomStatus(store.arrivals, store.stays),
  ]);
});
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

.pre-scrollable {
  min-height: 280px;
  max-height: 280px;
  overflow-y: scroll;
}

.chart-room {
  min-height: 340px;
  max-height: 340px;
}
</style>
