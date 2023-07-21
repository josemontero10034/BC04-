import { PrismaClient } from "@prisma/client";

import SECTORS_DATA, { SectorData } from "../seed-data/sectors-data";

const PopulateSectors = async (prisma: PrismaClient, userId: string) => {
  const createdBy = { connect: { id: userId } };
  const lastUpdatedBy = { connect: { id: userId } };
  const loggingInfo = { createdBy, lastUpdatedBy };
  return prisma.$transaction([
    ...SECTORS_DATA.map((sector: SectorData) =>
      prisma.sector.upsert({
        where: { id: sector.id },
        update: {
          name: sector.name,
          province: { connect: { id: sector.provinceId } },
          city: { connect: { id: sector.cityId } },
          lastUpdatedBy,
        },
        create: {
          name: sector.name,
          province: { connect: { id: sector.provinceId } },
          city: { connect: { id: sector.cityId } },
          ...loggingInfo,
        },
      })
    ),
  ]);
};

export default PopulateSectors;
