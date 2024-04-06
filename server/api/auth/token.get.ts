import {
	verifyAccessToken,
	verifyRefreshToken,
	createAccessToken,
	getUserIdFromToken,
	decodeToken,
	getStoreRefreshToken,
} from '~/server/utils/session'
import { prisma } from '~~/prisma/db'

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
			message: 'Niepoprawny token dostępu [userId]',
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
				message: 'Niepoprawny token odswiezania',
			}
		}
	} else {
		return {
			success: true,
			user: isValid.decoded,
		}
	}
})
