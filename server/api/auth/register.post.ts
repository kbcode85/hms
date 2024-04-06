import { hashPassword } from '~~/server/utils/password'
import { prisma } from '~~/prisma/db'

export default defineEventHandler(async event => {
	const { email, username, password } = await readBody(event)

	const user = await prisma.user.findFirst({
		where: { OR: [{ username }, { email }] },
	})

	if (user != null) {
		prisma.$disconnect()
		return {
			message: 'User already exists',
			success: false,
		}
	} else {
		const { salt, hash } = await hashPassword(password)

		try {
			const createUser: any = await prisma.user.create({
				data: {
					email: email,
					username: username,
					password: hash,
					salt: salt,
					lastLoginIpAddress: '',
					currentLoggedInAt: new Date(),
					lastLoggedInAt: new Date(),
				},
			})

			delete createUser.password
			delete createUser.salt

			await prisma.$disconnect()

			createUser.success = true

			return createUser
		} catch (error) {
			await prisma.$disconnect()
			return {
				message: 'Internal server error',
				success: false,
			}
		}
	}
})
