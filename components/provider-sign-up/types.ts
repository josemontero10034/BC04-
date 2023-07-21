import { EmergencyContactRelation, Prisma, UserGender } from "@prisma/client";
import { FormikProps } from "formik";

export interface ProviderFormValues extends Prisma.AddressCreateInput {
  /* User related */
  firstName: string;
  lastName: string;
  gender?: UserGender;
  email: string;
  personalPhone: string;
  documentCode: string;
  // documentImgUrl: string; // This field is commented because we do not have the functionality to upload images to a any specific image hosting service.

  /* Provider profile related */
  homePhone: string;
  rncOrDgiiCode?: string;
  contactName: string;
  contactRelation?: EmergencyContactRelation;
  contactPhone: string;

  /* Provider address related */
  street: string;
  provinceId: number | undefined;
  cityId: number | undefined;
  sectorId: number | undefined;
  number?: string;
  subSectorId?: number;
}

export interface ProviderCustomProps {
  props: FormikProps<ProviderFormValues>;
}
