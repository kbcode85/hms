<template>
  <div>
    <div class="row mb-2 mb-xl-3">
      <div class="col-auto d-none d-sm-block">
        <h3>Księga gości</h3>
      </div>
    </div>

    <div class="row">
      <div class="d-flex justify-content-between">
        <div class="custom-dropdown">
          Pokaż wpisy:
          <select v-model="entriesPerPage" class="selectpicker">
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
        </div>
        <input v-model="searchQuery" placeholder="Szukajka" type="input" />
      </div>

      <table class="table table-striped">
        <thead>
          <tr>
            <th>
              Imię
              <span
                class="material-icons-sharp"
                :class="{ 'text-primary': isSorted('name', 'asc') }"
                @click="sort('name', 'asc')"
              >
                arrow_drop_up
              </span>
              <span
                class="material-icons-sharp"
                :class="{ 'text-primary': isSorted('name', 'desc') }"
                @click="sort('name', 'desc')"
              >
                arrow_drop_down
              </span>
            </th>
            <th>
              Nazwisko
              <span
                class="material-icons-sharp"
                :class="{ 'text-primary': isSorted('surname', 'asc') }"
                @click="sort('surname', 'asc')"
              >
                arrow_drop_up
              </span>
              <span
                class="material-icons-sharp"
                :class="{ 'text-primary': isSorted('surname', 'desc') }"
                @click="sort('surname', 'desc')"
              >
                arrow_drop_down
              </span>
            </th>
            <th>
              Telefon
              <span
                class="material-icons-sharp"
                :class="{ 'text-primary': isSorted('phone', 'asc') }"
                @click="sort('phone', 'asc')"
              >
                arrow_drop_up
              </span>
              <span
                class="material-icons-sharp"
                :class="{ 'text-primary': isSorted('phone', 'desc') }"
                @click="sort('phone', 'desc')"
              >
                arrow_drop_down
              </span>
            </th>
            <th>
              Email
              <span
                class="material-icons-sharp"
                :class="{ 'text-primary': isSorted('email', 'asc') }"
                @click="sort('email', 'asc')"
              >
                arrow_drop_up
              </span>
              <span
                class="material-icons-sharp"
                :class="{ 'text-primary': isSorted('email', 'desc') }"
                @click="sort('email', 'desc')"
              >
                arrow_drop_down
              </span>
            </th>
            <th>Akcje</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(guest, index) in guests"
            :key="guest.id"
            :class="{ 'bg-light': index % 2 === 0 }"
          >
            <td>{{ guest.name }}</td>
            <td>{{ guest.surname }}</td>
            <td>{{ guest.phone }}</td>
            <td>{{ guest.email }}</td>
            <td class="action-buttons">
              <button class="btn btn-primary">
                <span class="material-icons-sharp"> edit </span>
              </button>
              <button class="btn btn-danger">
                <span class="material-icons-sharp"> delete </span>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <nav aria-label="Page navigation">
        <ul class="pagination justify-content-center">
          <li
            class="page-item"
            :class="{ disabled: currentPage === 1 || totalPages === 0 }"
          >
            <a class="page-link" href="#" @click.prevent="currentPage--">
              Poprzednia
            </a>
          </li>
          <li class="page-item align-self-center">
            <div class="input-group input-group-sm">
              <input
                v-model.number="currentPage"
                type="number"
                class="form-control text-center"
                min="1"
                :max="totalPages"
              />
              <span class="input-group-text">/ {{ totalPages }}</span>
            </div>
          </li>
          <li
            class="page-item"
            :class="{
              disabled: currentPage === totalPages || totalPages === 0,
            }"
          >
            <a class="page-link" href="#" @click.prevent="currentPage++">
              Następna
            </a>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useMyGuestStore } from "~/stores/guest";

definePageMeta({
  middleware: ["auth"],
});

const store = useMyGuestStore();
const guests = computed(() => store.guests);
const entriesPerPage = ref(10);
const currentPage = ref(1);
const totalPages = computed(() => store.totalPages);
const searchQuery = ref("");

const sort = (field: string, direction: "asc" | "desc") => {
  store.sortGuests(field, direction);
};

const isSorted = (field: string, direction: "asc" | "desc") => {
  return store.sortField === field && store.sortDirection === direction;
};

onMounted(async () => {
  await store.fetchGuests(
    entriesPerPage.value,
    currentPage.value,
    searchQuery.value,
  );
});

watch([entriesPerPage, currentPage, searchQuery], async () => {
  await store.fetchGuests(
    entriesPerPage.value,
    currentPage.value,
    searchQuery.value,
  );
});

watch(
  [() => store.sortField, () => store.sortDirection],
  async (
    [newSortField, newSortDirection],
    [oldSortField, oldSortDirection],
  ) => {
    if (
      newSortField !== oldSortField ||
      newSortDirection !== oldSortDirection
    ) {
      await store.fetchGuests(
        entriesPerPage.value,
        currentPage.value,
        searchQuery.value,
      );
    }
  },
);
</script>

<style lang="scss" scoped>
.custom-dropdown {
  display: flex;
  align-items: center;
  gap: 10px;
}
.table {
  width: 100%;
  margin-top: 20px;
  border-collapse: collapse;
}

.table th,
.table td {
  padding: 15px;
  border: 1px solid #ddd;
  text-align: left;
}

.table th {
  background-color: #f8f9fa;
  color: #495057;
}

.table-striped tbody tr:nth-of-type(odd) {
  background-color: rgba(0, 0, 0, 0.05);
}

.table-hover tbody tr:hover {
  color: #212529;
  background-color: rgba(0, 0, 0, 0.075);
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  margin-left: 10px;
  transition:
    background-color 0.3s,
    box-shadow 0.3s;

  .material-icons-sharp {
    font-size: 1.2rem;
    color: white; // Slightly larger icon
  }
}

.btn-primary {
  background-color: $primary-color;
  &:hover {
    background-color: lighten($primary-color, 10%);
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  }
}

.btn-danger {
  background-color: $danger-color;
  color: white;
  &:hover {
    background-color: lighten($danger-color, 10%);
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  }
}
</style>
