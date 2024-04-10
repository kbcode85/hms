import { comparePasswords } from '~~/server/utils/password'
import { prisma } from '~~/prisma/db'
import { createAccessToken, createAndSetRefreshToken } from '~~/server/utils/session'

export default defineEventHandler(async event => {
	const { username, password } = await readBody(event)

	try {
		const user = await prisma.user.findUnique({
			where: { username: username },
		})

		if (user) {
			const match = await comparePasswords(password, user.password)

			if (match) {
				const token = await createAccessToken(user.id)

				setCookie(event, 'token', token)

				const refreshCookie = getCookie(event, 'refreshToken')

				if (
					!refreshCookie ||
					user.refreshToken !== refreshCookie ||
					(user.refreshTokenExpiresAt && user.refreshTokenExpiresAt < new Date())
				) {
					const newRequestToken = await createAndSetRefreshToken(user.id)

					if (newRequestToken) {
						setCookie(event, 'refreshToken', newRequestToken)
					}
				}

				const lastLoginIpAddr = event.req.headers.hasOwnProperty('x-forwarded-for')
					? event.req.headers['x-forwarded-for']?.toString()
					: '127.0.0.1'

				const userdata: any = await prisma.user.update({
					where: { username: username },
					data: {
						lastLoginIpAddress: lastLoginIpAddr,
					},
				})

				// setCookie(event, 'user', userdata.id)

				await prisma.$disconnect()

				return {
					id: userdata.id,
					token: token,
					refreshToken: userdata.refreshToken,
					refreshTokenExpiresAt: userdata.refreshTokenExpiresAt,
					success: true,
					message: 'Pomyślne zalogowanie',
				}
			} else {
				return {
					success: false,
					message: 'Nieprawidłowe dane uwierzytelniające',
				}
			}
		} else {
			await prisma.$disconnect()
			return {
				success: false,
				message: 'Nieprawidłowe dane uwierzytelniające',
			}
		}
	} catch (error) {
		await prisma.$disconnect()
		return {
			success: false,
			message: 'Wewnętrzny błąd serwera',
			error: error,
		}
	}
})
