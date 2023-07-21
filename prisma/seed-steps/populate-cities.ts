import { PrismaClient } from "@prisma/client";

import CITIES_DATA, { CityData } from "../seed-data/cities-data";

const PopulateCities = async (prisma: PrismaClient, userId: string) => {
  const createdBy = { connect: { id: userId } };
  const lastUpdatedBy = { connect: { id: userId } };
  const loggingInfo = { createdBy, lastUpdatedBy };
  return prisma.$transaction([
    ...CITIES_DATA.map((city: CityData) =>
      prisma.city.upsert({
        where: { id: city.id },
        update: {
          name: city.name,
          province: { connect: { id: city.provinceId } },
          lastUpdatedBy,
        },
        create: {
          name: city.name,
          province: { connect: { id: city.provinceId } },
          ...loggingInfo,
        },
      })
    ),
  ]);
};

export default PopulateCities;
