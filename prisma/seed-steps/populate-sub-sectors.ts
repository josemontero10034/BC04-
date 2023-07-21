import { PrismaClient } from "@prisma/client";

import SUB_SECTORS_DATA, { SubSectorData } from "../seed-data/sub-sectors-data";

const PopulateSubSectors = async (prisma: PrismaClient, userId: string) => {
  const createdBy = { connect: { id: userId } };
  const lastUpdatedBy = { connect: { id: userId } };
  const loggingInfo = { createdBy, lastUpdatedBy };
  return prisma?.$transaction([
    ...SUB_SECTORS_DATA.map((subSector: SubSectorData) =>
      prisma.subSector.upsert({
        where: { id: subSector.id },
        update: {
          name: subSector.name,
          province: { connect: { id: subSector.provinceId } },
          city: { connect: { id: subSector.cityId } },
          sector: { connect: { id: subSector.sectorId } },
          lastUpdatedBy,
        },
        create: {
          name: subSector.name,
          province: { connect: { id: subSector.provinceId } },
          city: { connect: { id: subSector.cityId } },
          sector: { connect: { id: subSector.sectorId } },
          ...loggingInfo,
        },
      })
    ),
  ]);
};

export default PopulateSubSectors;
