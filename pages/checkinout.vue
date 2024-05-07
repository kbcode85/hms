<template>
  <div>
    <div class="row mb-2 mb-xl-3">
      <div class="col-auto d-none d-sm-block">
        <h3>Meldunki</h3>
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
            <th scope="col">Osoba przebywająca</th>
            <th scope="col">Ile osób</th>
            <th scope="col">Pokój</th>
            <th scope="col">Data przyjazdu</th>
            <th scope="col">Data wyjazdu</th>
            <th scope="col">Dodatki</th>
            <th scope="col">DND</th>
            <th scope="col">Serwis</th>
            <th scope="col">Akcje</th>
          </tr>
        </thead>
        <tbody>
          <tr class="align-middle">
            <td>53453</td>
            <td>Kacper Baranowski</td>
            <td>2</td>
            <td>101</td>
            <td>2024-05-01</td>
            <td>2024-05-03</td>
            <td>
              <span class="material-icons-sharp text-success">
                local_parking
              </span>
              <span class="material-icons-sharp text-success">
                restaurant
              </span>
            </td>
            <td>
              <span class="material-icons-sharp text-muted">
                do_not_disturb
              </span>
            </td>
            <td>
              <span class="material-icons-sharp text-success">
                cleaning_services
              </span>
            </td>
            <td>
              <div class="d-flex justify-content-between align-items-center">
                <button
                  class="btn btn-success p-1"
                  aria-label="Edit"
                  @click="openPanel('edit', booking)"
                >
                  <span class="material-icons-sharp">logout</span>
                </button>
                <button
                  class="btn btn-warning p-1"
                  aria-label="Edit"
                  @click="openPanel('edit', booking)"
                >
                  <span class="material-icons-sharp">change_circle</span>
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
                  aria-label="Edit"
                  @click="openPanel('edit', booking)"
                >
                  <span class="material-icons-sharp">delete</span>
                </button>
              </div>
            </td>
          </tr>
          <tr class="align-middle">
            <td>54323</td>
            <td>Kacper Baranowski</td>
            <td>2</td>
            <td>103</td>
            <td>2024-05-03</td>
            <td>2024-05-05</td>
            <td>
              <span class="material-icons-sharp text-muted">
                local_parking
              </span>
              <span class="material-icons-sharp text-success">
                restaurant
              </span>
            </td>
            <td>
              <span class="material-icons-sharp text-danger">
                do_not_disturb
              </span>
            </td>
            <td>
              <span class="material-icons-sharp text-muted">
                cleaning_services
              </span>
            </td>
            <td>
              <div class="d-flex justify-content-between align-items-center">
                <button
                  class="btn btn-success p-1"
                  aria-label="Edit"
                  @click="openPanel('edit', booking)"
                >
                  <span class="material-icons-sharp">logout</span>
                </button>
                <button
                  class="btn btn-warning p-1"
                  aria-label="Edit"
                  @click="openPanel('edit', booking)"
                >
                  <span class="material-icons-sharp">change_circle</span>
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
                  aria-label="Edit"
                  @click="openPanel('edit', booking)"
                >
                  <span class="material-icons-sharp">delete</span>
                </button>
              </div>
            </td>
          </tr>
          <tr class="align-middle">
            <td>54543</td>
            <td>Jan Kowalski</td>
            <td>2</td>
            <td>104</td>
            <td>2024-05-03</td>
            <td>2024-05-05</td>
            <td>
              <span class="material-icons-sharp text-muted">
                local_parking
              </span>
              <span class="material-icons-sharp text-muted"> restaurant </span>
            </td>
            <td>
              <span class="material-icons-sharp text-muted">
                do_not_disturb
              </span>
            </td>
            <td>
              <span class="material-icons-sharp text-muted">
                cleaning_services
              </span>
            </td>
            <td>
              <div class="d-flex justify-content-between align-items-center">
                <button
                  class="btn btn-success p-1"
                  aria-label="Edit"
                  @click="openPanel('edit', booking)"
                >
                  <span class="material-icons-sharp">logout</span>
                </button>
                <button
                  class="btn btn-warning p-1"
                  aria-label="Edit"
                  @click="openPanel('edit', booking)"
                >
                  <span class="material-icons-sharp">change_circle</span>
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
                  aria-label="Edit"
                  @click="openPanel('edit', booking)"
                >
                  <span class="material-icons-sharp">delete</span>
                </button>
              </div>
            </td>
          </tr>
          <tr class="align-middle">
            <td class="text-success">42341</td>
            <td class="text-success">Jan Kowalski</td>
            <td class="text-success">2</td>
            <td class="text-success">102</td>
            <td class="text-success">2024-05-02</td>
            <td class="text-success">2024-05-04</td>
            <td>
              <span class="material-icons-sharp text-muted">
                local_parking
              </span>
              <span class="material-icons-sharp text-muted"> restaurant </span>
            </td>
            <td>
              <span class="material-icons-sharp text-muted">
                do_not_disturb
              </span>
            </td>
            <td>
              <span class="material-icons-sharp text-muted">
                cleaning_services
              </span>
            </td>
            <td>
              <div class="d-flex justify-content-between align-items-center">
                <button
                  class="btn btn-success p-1 disabled"
                  aria-label="Edit"
                  @click="openPanel('edit', booking)"
                >
                  <span class="material-icons-sharp">logout</span>
                </button>
                <button
                  class="btn btn-warning p-1 disabled"
                  aria-label="Edit"
                  @click="openPanel('edit', booking)"
                >
                  <span class="material-icons-sharp">change_circle</span>
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
                  aria-label="Edit"
                  @click="openPanel('edit', booking)"
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
