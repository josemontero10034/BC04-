import { Prisma } from "@prisma/client";

export interface AddAddressFormValues extends Prisma.AddressCreateInput {
  /* Provider address related */
  street: string;
  number?: string;
  provinceId: number | undefined;
  cityId: number | undefined;
  sectorId: number | undefined;
  subSectorId?: number;
  references?: string;
  isMainAddress: boolean;
  alias?: string;
}
