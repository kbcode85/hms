import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
	await prisma.hotel.create({
		data: {
			name: 'Przykładowy Hotel',
			star: 5,
			address: 'ul. Przykładowa 1',
			city: 'Warszawa',
			country: 'Polska',
			phone: '+48 123 456 789',
			email: 'info@przykladowyhotel.pl',
			website: 'www.przykladowyhotel.pl',
			zip_code: '00-001',
			description: 'To jest przykładowy hotel.',
		},
	})
}

main()
	.catch(e => {
		console.error(e)
		process.exit(1)
	})
	.finally(async () => {
		await prisma.$disconnect()
	})
