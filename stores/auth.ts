import { defineStore } from 'pinia'

interface UserData {
	success: boolean
	user: object
}

export const useAuthStore = defineStore({
	id: 'auth',
	state: () => ({
		data: { success: false, user: {} } as UserData,
	}),
	actions: {
		async checkAuth() {
			const token = useCookie('token').value || ''

			try {
				const data: UserData = await $fetch('/api/auth/me', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({
						token: token,
					}),
				})

				this.data = data
			} catch (error) {
				console.log(error)
				// Dodać obsługę błędów
			}
		},
		async logout() {
			try {
				const { success } = await $fetch('/api/auth/logout', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
				})

				if (success) {
					window.location.href = '/'
				}
			} catch (error) {
				console.log(error)
				// Dodać obsługę błędów
			}
		},
		async login(username: string, password: string) {
			const router = useRouter()
			try {
				if (!username || !password) {
					return { success: false, message: 'Please fill in all fields' }
				}

				const response = await $fetch('/api/auth/login', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({ username, password }),
				})

				if (response.success) {
					router.push({ path: '/' })
				}

				return response
			} catch (error) {
				console.log(error)
				return { success: false, message: 'An error occurred' }
			}
		},
	},
})
