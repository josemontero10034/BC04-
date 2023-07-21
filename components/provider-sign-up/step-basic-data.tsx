import { Stack } from "@mui/material";
import { UserGender } from "@prisma/client";
import { useTranslations } from "next-intl";
import React from "react";

import {
  CustomFormControl,
  CustomMenuItem,
  CustomPhoneInput,
  CustomSelect,
} from "../shared/custom-fields";
import { ProviderCustomProps } from "./types";

export const BasicData = ({
  props: { errors, touched, values, handleChange, handleBlur },
}: ProviderCustomProps) => {
  const t = useTranslations("common");

  const translatedUserGender: Record<UserGender, string> = {
    MALE: `${t("genderValue.male")}`,
    FEMALE: `${t("genderValue.female")}`,
    OTHER: `${t("genderValue.other")}`,
    PREFER_NOT_TO_SAY: `${t("genderValue.preferNotToSay")}`,
  };

  return (
    <>
      <Stack className="flex flex-col items-center gap-5">
        <CustomFormControl
          required
          label={t("firstName")}
          name="firstName"
          value={values.firstName}
          onChange={handleChange}
          onBlur={handleBlur}
          error={!!errors.firstName}
          touched={touched.firstName}
        />
        <CustomFormControl
          required
          label={t("lastName")}
          name="lastName"
          value={values.lastName}
          onChange={handleChange}
          onBlur={handleBlur}
          error={!!errors.lastName}
          touched={touched.lastName}
        />
        <CustomSelect
          name={"gender"}
          label={t("gender")}
          onBlur={handleBlur}
          onChange={handleChange}
        >
          {Object.values(UserGender).map((gender) => {
            return (
              <CustomMenuItem key={gender} value={gender}>
                {translatedUserGender[gender]}
              </CustomMenuItem>
            );
          })}
        </CustomSelect>
        <CustomFormControl
          label={t("email")}
          value={values.email}
          onChange={handleChange}
          name="email"
          onBlur={handleBlur}
          error={!!errors.email}
          touched={touched.email}
        />

        <CustomPhoneInput
          name="personalPhone"
          label={t("personalPhone")}
          onBlur={handleBlur}
          onChange={handleChange}
          required
        />

        <CustomPhoneInput
          name="homePhone"
          label={t("homePhone")}
          onBlur={handleBlur}
          onChange={handleChange}
        />
      </Stack>
    </>
  );
};
