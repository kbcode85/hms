import { comparePasswords } from '~~/server/utils/password'
import { prisma } from '~~/prisma/db'
import { createAccessToken, createRefreshToken } from '~~/server/utils/session'

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

				if (!refreshCookie) {
					const refreshToken = await createRefreshToken(user.id)
					setCookie(event, 'refreshToken', refreshToken)
					await prisma.user.update({
						where: { username: username },
						data: {
							refreshToken: refreshToken,
							refreshTokenExpiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
						},
					})
				} else {
					const storedRefreshToken = user.refreshToken
					const storedRefreshTokenExpiresAt = user.refreshTokenExpiresAt

					if (
						!storedRefreshToken ||
						storedRefreshToken !== refreshCookie ||
						(storedRefreshTokenExpiresAt && storedRefreshTokenExpiresAt < new Date())
					) {
						const refreshToken = await createRefreshToken(user.id)
						setCookie(event, 'refreshToken', refreshToken)
						await prisma.user.update({
							where: { username: username },
							data: {
								refreshToken: refreshToken,
								refreshTokenExpiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
							},
						})
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
				}
			} else {
				return {
					message: 'Invalid credentials',
					success: false,
				}
			}
		} else {
			await prisma.$disconnect()
			return {
				message: 'Invalid credentials',
				success: false,
			}
		}
	} catch (error) {
		await prisma.$disconnect()
		return {
			message: 'Internal Server Error',
			success: false,
		}
	}
})
