import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default defineEventHandler(async event => {
	const hotel = await prisma.hotel.findFirst({
		where: {
			id: 1,
		},
	})

	if (!hotel) {
		return {
			status: 404,
			body: {
				message: 'Hotel not found',
			},
		}
	} else {
		return {
			body: hotel,
		}
	}
})
