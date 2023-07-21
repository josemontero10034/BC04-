/* eslint-disable no-console */
import { PrismaClient } from "@prisma/client";

import SeedSystemUser from "./seed-steps/create-system-user";
import PopulateCities from "./seed-steps/populate-cities";
import PopulateProvinces from "./seed-steps/populate-provinces";
import PopulateSectors from "./seed-steps/populate-sectors";
import PopulateServices from "./seed-steps/populate-services";
import PopulateSubSectors from "./seed-steps/populate-sub-sectors";
import PopulateSubServices from "./seed-steps/populate-sub-services";

const prisma = new PrismaClient();

const main = async () => {
  let startTime: number;

  // Step 1 - Create the system user
  startTime = new Date().getTime();
  const createdUser = await SeedSystemUser(prisma);
  console.log(
    "Created system user:",
    {
      id: createdUser.id,
      email: createdUser.email,
    },
    `In: ${((new Date().getTime() - startTime) / 1000).toFixed(2)}s`
  );

  // Step 2 - Populate services Types
  startTime = new Date().getTime();
  const servicesTypes = await PopulateServices(prisma, createdUser.id);
  console.log(
    "Created services types:",
    servicesTypes.length,
    `In: ${((new Date().getTime() - startTime) / 1000).toFixed(2)}s`
  );

  // Step 3 - Populate sub-services
  startTime = new Date().getTime();
  const subServicesTypes = await PopulateSubServices(prisma, createdUser.id);
  console.log(
    "Created sub-services types:",
    subServicesTypes.length,
    `In: ${((new Date().getTime() - startTime) / 1000).toFixed(2)}s`
  );

  // Step 4 - Populate provinces
  startTime = new Date().getTime();
  const provinces = await PopulateProvinces(prisma, createdUser.id);
  console.log(
    "Created provinces:",
    provinces.length,
    `In: ${((new Date().getTime() - startTime) / 1000).toFixed(2)}s`
  );

  // Step 5 - Populate cities
  startTime = new Date().getTime();
  const cities = await PopulateCities(prisma, createdUser.id);
  console.log(
    "Created cities:",
    cities.length,
    `In: ${((new Date().getTime() - startTime) / 1000).toFixed(2)}s`
  );

  // Step 6 - Populate sectors
  startTime = new Date().getTime();
  const sectors = await PopulateSectors(prisma, createdUser.id);
  console.log(
    "Created sectors:",
    sectors.length,
    `In: ${((new Date().getTime() - startTime) / 1000).toFixed(2)}s`
  );

  // Step 7 - Populate sub sectors
  startTime = new Date().getTime();
  const subSectors = await PopulateSubSectors(prisma, createdUser.id);
  console.log(
    "Created sub-sectors:",
    subSectors.length,
    `In: ${((new Date().getTime() - startTime) / 1000).toFixed(2)}s`
  );
};

main()
  .catch((e) => {
    // eslint-disable-next-line no-console
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
