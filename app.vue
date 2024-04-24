<template>
  <NuxtLoadingIndicator />
  <ModalDeleteguest />
  <!-- <SlideoutpanelGuest /> -->
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script>
// import SlideoutpanelGuest from "/components/slideoutpanel/guest.vue";
import ModalDeleteguest from "/components/modal/deleteguest.vue";
export default {
  components: {
    ModalDeleteguest,
    // SlideoutpanelGuest,
  },
};
</script>

<style></style>
