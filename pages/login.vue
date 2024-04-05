<template>
	<div class="d-flex flex-column min-vh-100">
		<LoginForm />
		<footer class="text-center py-3 mt-auto">&copy; {{ new Date().getFullYear() }} Hotel Management System</footer>
	</div>
</template>

<script lang="ts" setup>
definePageMeta({
	layout: 'auth',
	middleware: ['not-auth'],
})
</script>

<style>
body,
html {
	margin: 0;
	padding: 0;
	height: 100vh;
	overflow: hidden;
}
</style>
