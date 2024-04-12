<template>
	<div class="wrapper">
		<Sidebar />

		<div class="main">
			<nav class="navbar navbar-expand navbar-light navbar-bg">
				<a class="sidebar-toggle js-sidebar-toggle" @click="toggleSidebar">
					<i class="hamburger align-self-center"></i>
				</a>

				<div class="navbar-collapse collapse">
					<ul class="navbar-nav navbar-align">
						<li class="nav-item dropdown">
							<a class="nav-icon dropdown-toggle" href="#" id="alertsDropdown" data-bs-toggle="dropdown">
								<div class="position-relative">
									<i class="align-middle material-icons-sharp">notifications</i>
									<span class="indicator">4</span>
								</div>
							</a>
							<div class="dropdown-menu dropdown-menu-lg dropdown-menu-end py-0" aria-labelledby="alertsDropdown">
								<div class="dropdown-menu-header">4 New Notifications</div>
								<div class="list-group">
									<a href="#" class="list-group-item">
										<div class="row g-0 align-items-center">
											<div class="col-2">
												<i class="text-danger" data-feather="alert-circle"></i>
											</div>
											<div class="col-10">
												<div class="text-dark">Update completed</div>
												<div class="text-muted small mt-1">Restart server 12 to complete the update.</div>
												<div class="text-muted small mt-1">30m ago</div>
											</div>
										</div>
									</a>
									<a href="#" class="list-group-item">
										<div class="row g-0 align-items-center">
											<div class="col-2">
												<i class="text-warning" data-feather="bell"></i>
											</div>
											<div class="col-10">
												<div class="text-dark">Lorem ipsum</div>
												<div class="text-muted small mt-1">Aliquam ex eros, imperdiet vulputate hendrerit et.</div>
												<div class="text-muted small mt-1">2h ago</div>
											</div>
										</div>
									</a>
									<a href="#" class="list-group-item">
										<div class="row g-0 align-items-center">
											<div class="col-2">
												<i class="text-primary" data-feather="home"></i>
											</div>
											<div class="col-10">
												<div class="text-dark">Login from 192.186.1.8</div>
												<div class="text-muted small mt-1">5h ago</div>
											</div>
										</div>
									</a>
									<a href="#" class="list-group-item">
										<div class="row g-0 align-items-center">
											<div class="col-2">
												<i class="text-success" data-feather="user-plus"></i>
											</div>
											<div class="col-10">
												<div class="text-dark">New connection</div>
												<div class="text-muted small mt-1">Christina accepted your request.</div>
												<div class="text-muted small mt-1">14h ago</div>
											</div>
										</div>
									</a>
								</div>
								<div class="dropdown-menu-footer">
									<a href="#" class="text-muted">Show all notifications</a>
								</div>
							</div>
						</li>
						<li class="nav-item dropdown">
							<a class="nav-icon dropdown-toggle" href="#" id="messagesDropdown" data-bs-toggle="dropdown">
								<div class="position-relative">
									<i class="align-middle material-icons-sharp">question_answer</i>
								</div>
							</a>
							<div class="dropdown-menu dropdown-menu-lg dropdown-menu-end py-0" aria-labelledby="messagesDropdown">
								<div class="dropdown-menu-header">
									<div class="position-relative">4 New Messages</div>
								</div>
								<div class="list-group">
									<a href="#" class="list-group-item">
										<div class="row g-0 align-items-center">
											<div class="col-2">
												<!-- <img
													src="img/avatars/avatar-5.jpg"
													class="avatar img-fluid rounded-circle"
													alt="Vanessa Tucker" /> -->
											</div>
											<div class="col-10 ps-2">
												<div class="text-dark">Vanessa Tucker</div>
												<div class="text-muted small mt-1">Nam pretium turpis et arcu. Duis arcu tortor.</div>
												<div class="text-muted small mt-1">15m ago</div>
											</div>
										</div>
									</a>
									<a href="#" class="list-group-item">
										<div class="row g-0 align-items-center">
											<div class="col-2">
												<!-- <img
													src="img/avatars/avatar-2.jpg"
													class="avatar img-fluid rounded-circle"
													alt="William Harris" /> -->
											</div>
											<div class="col-10 ps-2">
												<div class="text-dark">William Harris</div>
												<div class="text-muted small mt-1">Curabitur ligula sapien euismod vitae.</div>
												<div class="text-muted small mt-1">2h ago</div>
											</div>
										</div>
									</a>
									<a href="#" class="list-group-item">
										<div class="row g-0 align-items-center">
											<div class="col-2">
												<!-- <img
													src="img/avatars/avatar-4.jpg"
													class="avatar img-fluid rounded-circle"
													alt="Christina Mason" /> -->
											</div>
											<div class="col-10 ps-2">
												<div class="text-dark">Christina Mason</div>
												<div class="text-muted small mt-1">Pellentesque auctor neque nec urna.</div>
												<div class="text-muted small mt-1">4h ago</div>
											</div>
										</div>
									</a>
									<a href="#" class="list-group-item">
										<div class="row g-0 align-items-center">
											<div class="col-2">
												<!-- <img
													src="img/avatars/avatar-3.jpg"
													class="avatar img-fluid rounded-circle"
													alt="Sharon Lessman" /> -->
											</div>
											<div class="col-10 ps-2">
												<div class="text-dark">Sharon Lessman</div>
												<div class="text-muted small mt-1">
													Aenean tellus metus, bibendum sed, posuere ac, mattis non.
												</div>
												<div class="text-muted small mt-1">5h ago</div>
											</div>
										</div>
									</a>
								</div>
								<div class="dropdown-menu-footer">
									<a href="#" class="text-muted">Show all messages</a>
								</div>
							</div>
						</li>
						<li class="nav-item dropdown">
							<a class="nav-icon dropdown-toggle d-inline-block d-sm-none" href="#" data-bs-toggle="dropdown">
								<i class="align-middle material-icons-sharp">settings</i>
							</a>

							<a class="nav-link dropdown-toggle d-none d-sm-inline-block" href="#" data-bs-toggle="dropdown">
								<img src="/assets/img/user.png" style="width: 40px" class="avatar img-fluid rounded me-2" alt="user" />
								<span class="text-dark">{{ username }}</span>
							</a>
							<div class="dropdown-menu dropdown-menu-end">
								<a class="dropdown-item" href="#"
									><i class="align-middle me-1 material-icons-sharp">person</i> Profil</a
								>
								<div class="dropdown-divider"></div>
								<a class="dropdown-item" href="#"
									><i class="align-middle me-1 material-icons-sharp">manage_accounts</i> Ustwienia i prywatność</a
								>
								<a class="dropdown-item" href="#"
									><i class="align-middle me-1 material-icons-sharp">support</i> Pomoc</a
								>
								<div class="dropdown-divider"></div>
								<a class="dropdown-item" href="#"
									><i class="align-middle me-1 material-icons-sharp">logout</i>Wyloguj</a
								>
							</div>
						</li>
					</ul>
				</div>
			</nav>

			<main class="content">
				<div class="container-fluid p-0">
					<slot />
				</div>
			</main>
			<footer class="footer">
				<div class="container-fluid">
					<div class="row text-muted">
						<div class="col-6 text-start">
							<p class="mb-0">
								<span class="text-muted">HMSuite</span>
							</p>
						</div>
						<div class="col-6 text-end">
							<ul class="list-inline">
								<li class="list-inline-item">
									<a class="text-muted" href="https://github.com/kbcode85" target="_blank">Github</a>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</footer>
		</div>
	</div>
</template>

<script lang="ts" setup>
const store = useAuthStore()
let username = store.data.userdata.username

const logout = async () => {
	await store.logout()
}

const sidebar = useSidebarStore()
const toggleSidebar = sidebar.toggleSidebar
</script>

<style lang="scss">
.wrapper {
	align-items: stretch;
	display: flex;
	width: 100%;
	background: $sidebar-bg;
}

.main {
	display: flex;
	width: 100%;
	min-width: 0;
	min-height: 100vh;
	transition: $sidebar-transition;
	background: $body-bg;
	flex-direction: column;
	overflow: hidden;
	border-top-left-radius: 0;
	border-bottom-left-radius: 0;
}

.navbar {
	border-bottom: $navbar-border-bottom;
	box-shadow: $navbar-box-shadow;

	// @include media-breakpoint-down(md) {
	// 	width: 100vw;
	// }
}

.navbar .avatar {
	margin-top: -15px;
	margin-bottom: -15px;
}

.navbar-nav {
	direction: ltr;
}

.navbar-align {
	margin-left: auto;
}

.navbar-bg {
	background: $navbar-bg;
}

.navbar-brand {
	font-weight: $navbar-brand-font-weight;
	font-size: $navbar-brand-font-size;
	padding: $navbar-brand-padding-y $navbar-brand-padding-x;
	color: $navbar-brand-color;
	display: block;

	svg,
	.feather {
		color: $navbar-brand-icon-color;
		height: 24px;
		width: 24px;
		margin-left: -0.15rem;
		margin-right: 0.375rem;
		margin-top: -0.375rem;
	}
}

.nav-icon,
.nav-flag {
	padding: 0.1rem 0.8rem;
	display: block;
	font-size: 1.5rem;
	color: $gray-600;
	transition: $transition-appearance-fast;
	line-height: 1.4;

	&:after {
		display: none !important;
	}

	&:hover,
	&.active {
		color: $primary;
	}

	svg,
	.feather {
		width: 20px;
		height: 20px;
	}
}

.nav-item {
	.indicator {
		background: $primary;
		box-shadow: $box-shadow;
		border-radius: 50%;
		display: block;
		height: 18px;
		width: 18px;
		padding: 1px;
		position: absolute;
		top: 0;
		right: -8px;
		text-align: center;
		transition: top 0.1s ease-out;
		font-size: 0.675rem;
		color: $white;
	}

	&:hover .indicator {
		top: -4px;
	}

	a:focus {
		outline: 0;
	}
}

@media screen and (-ms-high-contrast: active), (-ms-high-contrast: none) {
	.navbar .avatar {
		max-height: 47px;
	}
}

// @include media-breakpoint-down(sm) {
// 	.navbar {
// 		padding: 0.75rem;
// 	}

// 	.nav-icon {
// 		padding: 0.1rem 0.75rem;
// 	}

// 	.dropdown,
// 	.dropleft,
// 	.dropright,
// 	.dropup {
// 		position: inherit;
// 	}

// 	.navbar-expand .navbar-nav .dropdown-menu-lg {
// 		min-width: 100%;
// 	}

// 	.nav-item .nav-link:after {
// 		display: none;
// 	}
// }

.nav-flag img {
	border-radius: 50%;
	width: 20px;
	height: 20px;
	object-fit: cover;
}

.navbar input {
	direction: ltr;
}

.hamburger,
.hamburger:before,
.hamburger:after {
	cursor: pointer;
	border-radius: 1px;
	height: 3px;
	width: $hamburger-width-middle;
	background: $gray-700;
	display: block;
	content: '';
	transition: $transition-appearance-fast;
}

.hamburger {
	position: relative;
}

.hamburger:before {
	top: -7.5px;
	width: $hamburger-width-top;
	position: absolute;
}

.hamburger:after {
	bottom: -7.5px;
	width: $hamburger-width-bottom;
	position: absolute;
}

.sidebar-toggle:hover {
	.hamburger,
	.hamburger:before,
	.hamburger:after {
		background: $primary;
	}
}

.hamburger-right {
	&,
	&:before,
	&:after {
		right: 0;
	}
}
.navbar-nav .dropdown-menu {
	box-shadow: $box-shadow;
}

.dropdown .dropdown-menu.show {
	animation-name: dropdownAnimation;
	animation-duration: 0.25s;
	animation-iteration-count: 1;
	animation-timing-function: ease;
	animation-fill-mode: forwards;
}

@keyframes dropdownAnimation {
	from {
		opacity: 0;
		transform: translateY(-8px);
	}
	to {
		opacity: 1;
		transform: translate(0);
	}
}

.dropdown-toggle:after {
	border: solid;
	border-width: 0 2px 2px 0;
	display: inline-block;
	padding: 2px;
	transform: rotate(45deg);
}

.dropdown-item {
	transition: $transition-appearance-fast;
}

.dropdown-menu {
	top: auto;
}

.dropdown-menu-lg {
	min-width: $dropdown-min-width * 2;
}

.dropdown .list-group .list-group-item {
	border-width: 0;
	border-bottom-width: 1px;
	margin-bottom: 0;

	&:first-child,
	&:last-child {
		border-radius: 0;
	}

	&:hover {
		background: $gray-100;
	}
}

.dropdown-menu-header {
	padding: $spacer * 0.75;
	text-align: center;
	font-weight: $font-weight-bold;
	border-bottom: 1px solid $gray-300;
}

.dropdown-menu-footer {
	padding: $spacer * 0.5;
	text-align: center;
	display: block;
	font-size: $font-size-sm;
}

.content {
	padding: $content-padding-mobile;
	flex: 1;
	width: 100vw;
	max-width: 100vw;
	direction: ltr;

	// @include media-breakpoint-up(md) {
	// 	width: auto;
	// 	max-width: auto;
	// }

	// @include media-breakpoint-up(lg) {
	// 	padding: $content-padding-desktop;
	// }
}

footer.footer {
	padding: $spacer $spacer * 0.875;
	direction: ltr;
	background: $footer-bg;

	ul {
		margin-bottom: 0;
	}

	// @include media-breakpoint-down(md) {
	// 	width: 100vw;
	// }
}
</style>
