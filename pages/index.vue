<template>
	<div class="container">
		<h2>Welcome</h2>
		<div class="justify-content-center mt-3">
			<button @click.prevent="logout" class="btn-grey">Log Out</button>
		</div>
	</div>
</template>

<script lang="ts" setup>
definePageMeta({
	middleware: ['auth'],
})

const store = useAuthStore()

const logout = async () => {
  await store.logout()
}
</script>

<style></style>
