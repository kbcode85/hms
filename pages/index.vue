<template>
	<div class="container">
		<h2>Welcome</h2>
		<h3>{{ _id }}</h3>
		<h3>{{ _name }}</h3>
		<h3>{{ _surname }}</h3>
		<h3>{{ _email }}</h3>
		<h3>{{ _phone }}</h3>
		<h3>{{ _created_at }}</h3>
		<div class="justify-content-center mt-3">
			<button @click.prevent="logout" class="btn-grey">Log Out</button>
		</div>
	</div>
</template>

<script lang="ts" setup>
definePageMeta({
	middleware: ['auth'],
})

const _id = ref()
const _name = ref()
const _surname = ref()
const _email = ref()
const _phone = ref()
const _created_at = ref()

const me = async () => {
	const token = useCookie('token').value || ''

	return await $fetch('/api/auth/me', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({
			token: token,
		}),
	})
		.then((data: any) => {
			return data
		})
		.catch(error => {
			console.log(error)
		})
}

const logout = async () => {
	let { success } = await $fetch('/api/auth/logout', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
	})
		.then((data: any) => {
			return data
		})
		.catch(error => {
			console.log(error)
		})

	if (success) {
		window.location.href = '/'
	}
}

onMounted(async () => {
	//Get user data that was stored in the cookie
	const {
		user: { id, name, surname, email, phone, created_at },
	} = await me()

	_id.value = id
	_name.value = name
	_surname.value = surname
	_email.value = email
	_phone.value = phone
	_created_at.value = created_at
})
</script>

<style></style>
