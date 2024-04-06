<template>
	<div class="d-flex flex-column flex-shrink-0 p-3 text-bg-dark" style="width: 280px; height: 100vh">
		<a href="/" class="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
			<img src="/assets/img/logo.png" alt="Favicon" class="bi pe-none me-2" width="40" height="32" />
			<span class="fs-4">HMS</span>
		</a>
		<hr />
		<ul class="nav nav-pills flex-column mb-auto">
			<li class="nav-item">
				<NuxtLink to="/" class="nav-link active d-flex align-items-center">
					<i class="material-icons-sharp">dashboard</i>
					<span class="ms-1">Dashboard</span>
				</NuxtLink>
			</li>
			<li class="nav-item">
				<NuxtLink to="/checkinout" class="nav-link text-white d-flex align-items-center">
					<i class="material-icons-sharp">hotel</i>
					<span class="ms-1">Meldunki</span>
				</NuxtLink>
			</li>
			<li class="nav-item">
				<NuxtLink to="/bookings" class="nav-link text-white d-flex align-items-center">
					<i class="material-icons-sharp">event</i>
					<span class="ms-1">Rezerwacje</span>
				</NuxtLink>
			</li>
			<li class="nav-item">
				<NuxtLink to="/guest" class="nav-link text-white d-flex align-items-center">
					<i class="material-icons-sharp">people</i>
					<span class="ms-1">Księga gości</span>
				</NuxtLink>
			</li>
			<li class="nav-item">
				<NuxtLink to="/rooms" class="nav-link text-white d-flex align-items-center">
					<i class="material-icons-sharp">bed</i>
					<span class="ms-1">Pokoje</span>
				</NuxtLink>
			</li>
			<li class="nav-item">
				<NuxtLink to="/invoices" class="nav-link text-white d-flex align-items-center">
					<i class="material-icons-sharp">receipt_long</i>
					<span class="ms-1">Faktury</span>
				</NuxtLink>
			</li>
			<li class="nav-item">
				<NuxtLink to="/reports" class="nav-link text-white d-flex align-items-center">
					<i class="material-icons-sharp">show_chart</i>
					<span class="ms-1">Raporty</span>
				</NuxtLink>
			</li>
		</ul>
		<hr />
		<div class="dropdown">
			<a
				href="#"
				class="d-flex align-items-center text-white text-decoration-none dropdown-toggle"
				data-bs-toggle="dropdown"
				aria-expanded="false">
				<i class="material-icons-sharp" style="font-size: 40px">account_circle</i>
				<p class="ms-2 mb-0">{{ username }}</p>
			</a>
			<ul class="dropdown-menu dropdown-menu-dark text-small shadow">
				<li class="dropdown-item">
					<NuxtLink to="/settings" class="nav-link d-flex align-items-center">
						<i class="material-icons-sharp">settings</i>
						<span class="ms-1">Ustawienia</span>
					</NuxtLink>
				</li>
				<li class="dropdown-item">
					<NuxtLink to="/profile" class="nav-link d-flex align-items-center">
						<i class="material-icons-sharp">person</i>
						<span class="ms-1">Profil</span>
					</NuxtLink>
				</li>
				<li><hr class="dropdown-divider" /></li>
				<li class="dropdown-item">
					<NuxtLink class="nav-link d-flex align-items-center" @click.prevent="logout">
						<i class="material-icons-sharp">logout</i>
						<span class="ms-1">Wyloguj</span>
					</NuxtLink>
				</li>
			</ul>
		</div>
	</div>
</template>

<script lang="ts" setup>
const store = useAuthStore()
let username = store.data.userdata.username

const logout = async () => {
	await store.logout()
}
</script>
<style></style>
