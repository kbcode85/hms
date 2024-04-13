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
      <div class="card flex-fill">
        <div class="card-body py-4">
          <div class="d-flex">
            <div class="flex-grow-1">
              <h3 class="mb-2">{{ card.value }}</h3>
              <h6 class="mb-0">{{ card.title }}</h6>
            </div>

            <div class="d-flex align-items-center">
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
</template>

<script lang="ts" setup>
definePageMeta({
  middleware: ["auth"],
});

const cards = [
  { title: "Pobyty", value: "100", data: "data1" },
  { title: "Przyjazdy", value: "200", data: "data2" },
  { title: "Wyjazdy", value: "300", data: "data3" },
  { title: "Nowe rezerwacje", value: "50", data: "data4" },
];
</script>

<style></style>
