<template>
  <NuxtModal v-model="modalStore.isModalOpen">
    <template #header>Usuń gościa</template>
    <template #content>
      <p>
        Czy na pewno chcesz usunąć gościa
        <strong
          >{{ modalStore.guestdata.name }}
          {{ modalStore.guestdata.surname }}</strong
        >?
      </p>
    </template>
    <template #buttons>
      <button @click="modalStore.closeModal">Anuluj</button>
      <button @click="modalStore.deleteGuest(modalStore.guestdata.id)">
        Usuń
      </button>
    </template>
  </NuxtModal>
</template>

<script lang="ts" setup>
const modalStore = useMyModalStore();
</script>

<style></style>
