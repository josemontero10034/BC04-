import { PrismaClient } from "@prisma/client";

import SYSTEM_USER from "../seed-data/system-user";

const SeedSystemUser = async (prisma: PrismaClient) => {
  return await prisma.user
    .upsert({
      /*
       * ESLINT was disable in this line because of the systemUser casted object
       * above that by returns email string or null by default
       */
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      where: { email: SYSTEM_USER.email! },
      update: SYSTEM_USER,
      create: SYSTEM_USER,
    })
    .then((user) => {
      return prisma.user.update({
        where: { id: user.id },
        data: {
          lastUpdatedBy: {
            connect: {
              id: user.id,
            },
          },
          createdBy: {
            connect: {
              id: user.id,
            },
          },
        },
      });
    })
    .catch((e) => {
      // eslint-disable-next-line no-console
      console.error(e);
      process.exit(1);
    });
};

export default SeedSystemUser;
