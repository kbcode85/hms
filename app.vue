<template>
  <NuxtLoadingIndicator />
  <ModalDeleteguest />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script>
import ModalDeleteguest from "/components/modal/deleteguest.vue";
export default {
  components: {
    ModalDeleteguest,
  },
};
</script>

<style></style>
