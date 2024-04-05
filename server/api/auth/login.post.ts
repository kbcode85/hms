import bcrypt from 'bcryptjs'
import { createJwtToken } from '~~/plugins/jwt'
import { prisma } from '~~/prisma/db'

export default defineEventHandler(async event => {
	const { username, password } = await readBody(event)

	try {
		const user = await prisma.user.findUnique({
			where: { username: username },
		})

		if (user) {
			const match = await bcrypt.compare(password, user.password)

			if (match) {
				const token = await createJwtToken()

				setCookie(event, 'token', token)

				const lastLoginIpAddr = event.req.headers.hasOwnProperty('x-forwarded-for') ? event.req.headers['x-forwarded-for']?.toString() : '127.0.0.1'

				const userdata: any = await prisma.user.update({
					where: { username: username },
					data: {
						lastLoginIpAddress: lastLoginIpAddr,
					},
				})

				delete userdata.password
				delete userdata.salt

				setCookie(event, 'user', JSON.stringify(userdata))

				await prisma.$disconnect()

				userdata.token = token
				userdata.success = true

				return userdata
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
