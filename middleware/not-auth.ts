export default defineNuxtRouteMiddleware(async (to, from) => {
	const authStore = useAuthStore()
	await authStore.checkAuth()
	const data = authStore.data

	if (data.success) {
		return navigateTo('/')
	} else {
		return true
	}
})
