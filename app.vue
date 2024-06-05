<template>
  <Notivue v-slot="item">
    <Notification :item="item" />
  </Notivue>

  <NuxtLoadingIndicator />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script></script>

<style></style>
