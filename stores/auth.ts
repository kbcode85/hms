import { defineStore } from 'pinia'

interface UserData {
	success: boolean
	message: string
	user: {
		userId: string
		iat: number
		exp: number
	}
	userdata: {
		id: string
		username: string
		email: string
	}
}

export const useAuthStore = defineStore({
	id: 'auth',
	state: () => ({
		data: {
			success: false,
			message: '',
			user: { userId: '', iat: 0, exp: 0 },
			userdata: { id: '', username: '', email: '' },
		} as UserData,
	}),
	actions: {
		async checkAuth() {
			const token = useCookie('token').value || ''

			try {
				const data: UserData = await $fetch('/api/auth/token', {
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${token}`,
					},
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
