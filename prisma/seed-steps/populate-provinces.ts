import { PrismaClient } from "@prisma/client";

import PROVINCES_DATA, { ProvinceData } from "../seed-data/provinces-data";

const PopulateProvinces = async (prisma: PrismaClient, userId: string) => {
  const createdBy = { connect: { id: userId } };
  const lastUpdatedBy = { connect: { id: userId } };
  const loggingInfo = { createdBy, lastUpdatedBy };
  return prisma.$transaction([
    ...PROVINCES_DATA.map((province: ProvinceData) =>
      prisma.province.upsert({
        where: { id: province.id },
        update: { ...province, lastUpdatedBy },
        create: { ...province, ...loggingInfo },
      })
    ),
  ]);
};

export default PopulateProvinces;
