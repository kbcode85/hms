<template>
  <div>
    <div class="row mb-2 mb-xl-3">
      <div class="col-auto d-none d-sm-block">
        <h3>Rezerwacje</h3>
      </div>

      <!-- <div class="col-auto ms-auto text-end mt-n1">
        <a href="#" class="btn btn-primary d-flex align-items-center gap-2">
          Odswieź <span class="material-icons-sharp">refresh</span>
        </a>
      </div> -->
    </div>
    <div class="row align-items-center">
      <div class="col">
        <button
          class="btn btn-primary me-2"
          aria-label="Edit"
          @click="openPanel('add')"
        >
          <span class="material-icons-sharp">add</span>
        </button>
        <input v-model="searchQuery" placeholder="Szukajka" type="input" />
      </div>

      <div class="col text-end">
        Pokaż wpisy:
        <select v-model="entriesPerPage" class="selectpicker">
          <option value="10">10</option>
          <option value="25">25</option>
          <option value="50">50</option>
          <option value="100">100</option>
        </select>
      </div>
    </div>

    <div class="table-responsive mt-2">
      <table class="table table-striped">
        <thead>
          <tr class="align-middle">
            <th scope="col">Numer</th>
            <th scope="col">OTA</th>
            <th scope="col">Osoba rezerwująca</th>
            <th scope="col">Ile osób</th>
            <th scope="col">Pokój</th>
            <th scope="col">Data przyjazdu</th>
            <th scope="col">Data wyjazdu</th>
            <th scope="col">Status</th>
            <th scope="col">Źródło</th>
            <th scope="col">Kwota</th>
            <th scope="col">Akcje</th>
          </tr>
        </thead>
        <tbody>
          <tr class="align-middle">
            <td>3242</td>
            <td>-</td>
            <td>Kacper Baranowski</td>
            <td>2</td>
            <td>101</td>
            <td>2024-05-01</td>
            <td>2024-05-03</td>
            <td>Gwarantowana</td>
            <td>Walk-in</td>
            <td>1235 PLN</td>
            <td>
              <div class="d-flex justify-content-between align-items-center">
                <button
                  class="btn btn-success p-1"
                  aria-label="Edit"
                  @click="openPanel('edit', booking)"
                >
                  <span class="material-icons-sharp">login</span>
                </button>
                <button
                  class="btn btn-primary p-1"
                  aria-label="Edit"
                  @click="openPanel('edit', booking)"
                >
                  <span class="material-icons-sharp">edit</span>
                </button>
                <button
                  class="btn btn-danger p-1"
                  aria-label="Delete"
                  @click="deleteBooking(booking.id)"
                >
                  <span class="material-icons-sharp">cancel</span>
                </button>
                <button
                  class="btn btn-danger p-1"
                  aria-label="Edit"
                  @click="deleteBooking(booking.id)"
                >
                  <span class="material-icons-sharp">delete</span>
                </button>
              </div>
            </td>
          </tr>
          <tr class="align-middle">
            <td class="text-success">3453</td>
            <td class="text-success">-</td>
            <td class="text-success">Jan Kowalski</td>
            <td class="text-success">2</td>
            <td class="text-success">102</td>
            <td class="text-success">2024-05-02</td>
            <td class="text-success">2024-05-04</td>
            <td class="text-success">Gwarantowana</td>
            <td class="text-success">Email</td>
            <td class="text-success">2354 PLN</td>
            <td>
              <div class="d-flex justify-content-between align-items-center">
                <button
                  class="btn btn-success p-1 disabled"
                  aria-label="Edit"
                  @click="openPanel('edit', booking)"
                >
                  <span class="material-icons-sharp">login</span>
                </button>
                <button
                  class="btn btn-primary p-1 disabled"
                  aria-label="Edit"
                  @click="openPanel('edit', booking)"
                >
                  <span class="material-icons-sharp">edit</span>
                </button>
                <button
                  class="btn btn-danger p-1 disabled"
                  aria-label="Delete"
                  @click="deleteBooking(booking.id)"
                >
                  <span class="material-icons-sharp">cancel</span>
                </button>
                <button
                  class="btn btn-danger p-1"
                  aria-label="Edit"
                  @click="deleteBooking(booking.id)"
                >
                  <span class="material-icons-sharp">delete</span>
                </button>
              </div>
            </td>
          </tr>
          <tr class="align-middle">
            <td class="text-danger">3533</td>
            <td class="text-danger">-</td>
            <td class="text-danger">Jan Kowalski</td>
            <td class="text-danger">3</td>
            <td class="text-danger">103</td>
            <td class="text-danger">2024-06-01</td>
            <td class="text-danger">2024-06-03</td>
            <td class="text-danger">Gwarantowana</td>
            <td class="text-danger">Telefon</td>
            <td class="text-danger">2354 PLN</td>
            <td>
              <div class="d-flex justify-content-between align-items-center">
                <button
                  class="btn btn-success p-1 disabled"
                  aria-label="Edit"
                  @click="openPanel('edit', booking)"
                >
                  <span class="material-icons-sharp">login</span>
                </button>
                <button
                  class="btn btn-primary p-1 disabled"
                  aria-label="Edit"
                  @click="openPanel('edit', booking)"
                >
                  <span class="material-icons-sharp">edit</span>
                </button>
                <button
                  class="btn btn-danger p-1"
                  aria-label="Delete"
                  @click="deleteBooking(booking.id)"
                >
                  <span class="material-icons-sharp">restore</span>
                </button>
                <button
                  class="btn btn-danger p-1"
                  aria-label="Edit"
                  @click="deleteBooking(booking.id)"
                >
                  <span class="material-icons-sharp">delete</span>
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  middleware: ["auth"],
});
</script>

<style lang="scss" scoped>
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
    color: white;
  }
}
</style>
