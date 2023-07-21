import { PrismaClient } from "@prisma/client";

import SERVICES_DATA, { ServiceData } from "../seed-data/services-data";

const PopulateServices = async (prisma: PrismaClient, userId: string) => {
  const createdBy = { connect: { id: userId } };
  const lastUpdatedBy = { connect: { id: userId } };
  const loggingInfo = { createdBy, lastUpdatedBy };
  return prisma.$transaction([
    ...SERVICES_DATA.map((service: ServiceData) =>
      prisma.serviceType.upsert({
        where: { id: service.id },
        update: { ...service, lastUpdatedBy },
        create: {
          ...service,
          ...loggingInfo,
        },
      })
    ),
  ]);
};

export default PopulateServices;
