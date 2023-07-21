import { PrismaClient } from "@prisma/client";

import SUB_SERVICES_DATA, {
  SubServiceData,
} from "../seed-data/sub-services-data";

const PopulateSubServices = async (prisma: PrismaClient, userId: string) => {
  const createdBy = { connect: { id: userId } };
  const lastUpdatedBy = { connect: { id: userId } };
  const loggingInfo = { createdBy, lastUpdatedBy };
  return prisma.$transaction([
    ...SUB_SERVICES_DATA.map((subServiceType: SubServiceData) =>
      prisma.subServiceType.upsert({
        where: { id: subServiceType.id },
        update: {
          id: subServiceType.id,
          name: subServiceType.name,
          serviceType: {
            connect: { id: subServiceType.serviceTypeId },
          },
          lastUpdatedBy,
        },
        create: {
          id: subServiceType.id,
          name: subServiceType.name,
          serviceType: {
            connect: {
              id: subServiceType.serviceTypeId,
            },
          },
          ...loggingInfo,
        },
      })
    ),
  ]);
};

export default PopulateSubServices;
