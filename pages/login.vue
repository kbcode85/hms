<template>
	<div class="d-flex flex-column min-vh-100">
		<LoginForm />
		<footer class="footer mt-auto py-3 text-center text-muted">
			Ta aplikacja została stworzona na potrzeby obrony pracy inżynierskiej. Nie jest przeznaczona do użytku
			komercyjnego. Wszystkie użyte logo i nazwy są fikcyjne i zostały wykorzystane wyłącznie w celach
			demonstracyjnych.<br />
			Uczelnia: Uniwersytet WSB Merito Gdańsk <br />
			Autor: Kacper Baranowski<br />
			Rok: {{ new Date().getFullYear() }}
		</footer>
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

footer {
	font-size: 0.8rem; /* Zmniejsz rozmiar czcionki */
	color: #888; /* Zmień kolor tekstu na jasnoszary */
}
</style>
