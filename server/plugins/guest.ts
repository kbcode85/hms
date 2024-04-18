import { faker } from "@faker-js/faker";
import { usePrisma } from "~/server/utils/prisma";
import * as GuestModel from "~/server/models/guest";

export default defineNitroPlugin(async (nitroApp) => {
  const prisma = usePrisma();

  for (let i = 0; i < 100; i++) {
    const guest: GuestModel.Guest = {
      name: faker.person.firstName() as GuestModel.Name,
      surname: faker.person.lastName() as GuestModel.Surname,
      phone: faker.phone.number() as GuestModel.Phone,
      email: faker.internet.email() as GuestModel.Email,
      address: faker.location.streetAddress() as GuestModel.Address,
      city: faker.location.city() as GuestModel.City,
      country: faker.location.country() as GuestModel.Country,
      zip_code: faker.location.zipCode() as GuestModel.ZipCode,
      description: "Sample description" as GuestModel.Description,
    };

    await prisma.guest.create({ data: guest });
  }
  console.log("Successfully generated guest data");
});
