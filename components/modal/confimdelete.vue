<template>
  <NuxtModal :name="name">
    <template v-slot:header>Witaj! 👋🏼</template>
    <template v-slot:content>
      <p>Ten proces będzie nieodwracalny. Czy na pewno chcesz kontynuować?</p>
    </template>

    <!-- Custom Buttons -->
    <template v-slot:buttons>
      <button class="button button-cancel" @click="close">Anuluj</button>
      <button class="button button-proceed" @click="close">Wykonaj</button>
    </template>
  </NuxtModal>
</template>

<script setup lang="ts">
const props = defineProps<{
  name: string;
}>();

const { close } = useModal(props.name);
</script>

<style scoped>
.button {
  padding: 10px 20px;
  border-radius: 4px;
  border: 0;
  cursor: pointer;
}

.button-cancel {
  color: #fff;
  background: #ff4e4e;
}

.button-cancel:hover {
  opacity: 0.7;
}

.button-proceed {
  background: #57c657;
  color: #fff;
}

.button-proceed:hover {
  opacity: 0.7;
}
</style>
