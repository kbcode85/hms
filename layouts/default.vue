<template>
	<div class="dashboard">
		<div class="dashboard-nav">
			<header>
				<a href="#" class="menu-toogle">
					<span class="material-icons-sharp"> menu </span>
				</a>
				<a href="#" class="brand-logo"
					><img src="/assets/img/logo.png" alt="Favicon" class="me-2" width="40" height="40" /><span class="fs-4"
						>HMSuite</span
					></a
				>
			</header>
			<nav class="dashboard-nav-list">
				<NuxtLink to="/" class="dashboard-nav-item" active-class="active">
					<i class="material-icons-sharp">dashboard</i> <span>Dashboard</span>
				</NuxtLink>
				<NuxtLink to="/checkinout" class="dashboard-nav-item" active-class="active">
					<i class="material-icons-sharp">hotel</i> <span>Meldunki</span>
				</NuxtLink>
				<NuxtLink to="/bookings" class="dashboard-nav-item" active-class="active">
					<i class="material-icons-sharp">event</i> <span>Rezerwacje</span>
				</NuxtLink>
				<NuxtLink to="/guest" class="dashboard-nav-item" active-class="active">
					<i class="material-icons-sharp">people</i> <span>Księga gości</span>
				</NuxtLink>
				<NuxtLink to="/rooms" class="dashboard-nav-item" active-class="active">
					<i class="material-icons-sharp">bed</i> <span>Pokoje</span>
				</NuxtLink>
				<NuxtLink to="/invoices" class="dashboard-nav-item" active-class="active">
					<i class="material-icons-sharp">receipt_long</i> <span>Faktury</span>
				</NuxtLink>
				<NuxtLink to="/reports" class="dashboard-nav-item" active-class="active">
					<i class="material-icons-sharp">show_chart</i> <span>Raporty</span>
				</NuxtLink>
			</nav>
		</div>

		<div class="dashboard-app">
			<div class="dashborad-content">
				<div class="container">
					<slot />
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup></script>

<style lang="scss">
.dashboard {
	display: flex;
	min-height: 100vh;

	&-nav {
		min-width: 238px;
		position: fixed;
		left: 0;
		top: 0;
		bottom: 0;
		overflow: auto;
		background-color: #443ea2;
		text-decoration: none;

		header {
			min-height: 84px;
			padding: 8px 27px;

			.brand-logo {
				font-weight: bold;
				font-size: 20px;
				display: flex;
				color: #ffffff;
				align-items: center;
				display: flex;
				justify-content: center;
				align-items: center;
			}

			.menu-toogle {
				display: none;
				font-size: 1.5rem;
				cursor: pointer;
			}
		}

		&-list {
			display: flex;
			flex-direction: column;
		}

		&-item {
			min-height: 56px;
			padding: 8px 20px 8px 70px;
			display: flex;
			align-items: center;
			letter-spacing: 0.02em;
			transition: ease-out 0.5s;
			text-decoration: none;
			color: #ffffff;

			i {
				width: 36px;
				font-size: 19px;
				margin-left: -40px;
			}
		}
	}

	&-app {
		display: flex;
		flex-direction: column;
		flex-grow: 2;
		margin-top: 84px;

		@media (min-width: 992px) {
			margin-left: 250px;
		}
	}

	&-content {
		flex-grow: 2;
		padding: 25px;

		@media (max-width: 768px) {
			padding: 15px 0px;
		}
	}
}
</style>
