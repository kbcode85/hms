import {
	verifyAccessToken,
	verifyRefreshToken,
	createAccessToken,
	getUserIdFromToken,
	getStoreRefreshToken,
	getUserData,
} from '~/server/utils/session'

export default defineEventHandler(async event => {
	const authHeader = event.req.headers.authorization
	const token = authHeader && authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null

	if (!token) {
		return {
			success: false,
			message: 'Brak tokenu dostępu',
		}
	}

	if (verifyRefreshToken(token).valid) {
		return {
			success: false,
			message: 'Token odświeżania nie może być używany do uwierzytelniania',
		}
	}

	const userId = await getUserIdFromToken(token)

	if (!userId) {
		return {
			success: false,
			message: 'Niepoprawny token dostępu',
		}
	}

	const isValid = await verifyAccessToken(token)

	if (!isValid.valid) {
		const storedRefreshToken = await getStoreRefreshToken(userId)
		const RefreshToken: any = getCookie(event, 'refreshToken')

		if (verifyRefreshToken(RefreshToken).valid && storedRefreshToken === RefreshToken) {
			const newToken = await createAccessToken(userId)
			setCookie(event, 'token', newToken)
			return {
				success: true,
				message: 'Został wygenerowany nowy token dostępu',
			}
		} else {
			return {
				success: false,
				message: 'Niepoprawny token odswiezania, zaloguj się ponownie aby uzyskać nowy token dostępu',
			}
		}
	} else {
		const userdata: any = await getUserData(token)
		return {
			success: true,
			message: 'Token dostępu jest poprawny',
			user: isValid.decoded,
			userdata,
		}
	}
})
