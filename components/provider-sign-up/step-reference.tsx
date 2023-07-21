import { Stack, Typography } from "@mui/material";
import { EmergencyContactRelation } from "@prisma/client";
import { useTranslations } from "next-intl";
import React from "react";

import {
  CustomFormControl,
  CustomMenuItem,
  CustomPhoneInput,
  CustomSelect,
} from "../shared/custom-fields";
import { ProviderCustomProps } from "./types";

export const Contacts = ({
  props: { errors, touched, values, handleChange, handleBlur },
}: ProviderCustomProps) => {
  const t = useTranslations();
  const translatedEmergencyContactRelation: Record<
    EmergencyContactRelation,
    string
  > = {
    PARENT: t("common.relationValue.parent"),
    CHILD: t("common.relationValue.child"),
    PARTNER: t("common.relationValue.partner"),
    FRIEND: t("common.relationValue.friend"),
    OTHER: t("common.relationValue.other"),
  };

  return (
    <>
      <Stack className="flex flex-col space-y-3 items-center">
        <Typography
          variant="h5"
          className="text-primary-dark mb-[5px] pr-[170px]"
        >
          {t("providerSignUp.emergencyContact")}
        </Typography>
        <CustomFormControl
          label={t("common.contactName")}
          name="contactName"
          value={values.contactName}
          onChange={handleChange}
          onBlur={handleBlur}
          error={!!errors.contactName}
          touched={touched.contactName}
          required
        />
        <CustomSelect
          name={"contactRelation"}
          label={t("common.contactRelation")}
          onBlur={handleBlur}
          onChange={handleChange}
        >
          {Object.values(EmergencyContactRelation).map((relation) => {
            return (
              <CustomMenuItem key={relation} value={relation}>
                {translatedEmergencyContactRelation[relation]}
              </CustomMenuItem>
            );
          })}
        </CustomSelect>
        <CustomPhoneInput
          name="contactPhone"
          label={t("common.contactPhone")}
          onBlur={handleBlur}
          onChange={handleChange}
          required
        />
      </Stack>
    </>
  );
};
