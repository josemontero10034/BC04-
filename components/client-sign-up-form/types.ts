import { UserGender } from "@prisma/client";
import { FormikProps } from "formik";
import { createTranslator } from "next-intl";
import * as yup from "yup";

import * as messages from "../../../messages/en.json";

const t = createTranslator({ locale: "en", messages });

export interface ClientFormValues {
  firstName: string;
  lastName: string;
  gender?: UserGender;
  email: string;
  personalPhone: string;
  termsOfService: boolean;
}

export interface ClientCustomProps {
  props: FormikProps<ClientFormValues>;
}

export const clientInitialValues = {
  firstName: "",
  lastName: "",
  gender: undefined,
  email: "",
  personalPhone: "",
  termsOfService: false,
} as ClientFormValues;

const ValidationRegexForm = {
  fullName:
    /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçšžÀÁÂÄÃÅĄĆĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u,
  email: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
};

export const clientValidationSchema = yup.object().shape({
  firstName: yup
    .string()
    .trim()
    .max(30, t("common.errorMessages.matches.firstNameMaxChart"))
    .matches(
      ValidationRegexForm.fullName,
      t("common.errorMessages.matches.firstName")
    )
    .required(t("common.errorMessages.required.firstName")),
  lastName: yup
    .string()
    .trim()
    .max(30, t("common.errorMessages.matches.lastNameMaxChart"))
    .matches(
      ValidationRegexForm.fullName,
      t("common.errorMessages.matches.lastName")
    )
    .required(t("common.errorMessages.required.lastName")),
  gender: yup.string().trim(),
  email: yup
    .string()
    .trim()
    .email(t("common.errorMessages.matches.email"))
    .required(t("common.errorMessages.required.email")),
  personalPhone: yup
    .string()
    .trim()
    .min(14, t("common.errorMessages.matches.phoneNumberMinChart"))
    .matches(
      /^[(]809|829|849[)]\s\d{3}-\d{4}/,
      t("clientSignUpForm.conactInfo.personalPhone.noMatch")
    )
    .required(t("common.errorMessages.required.phoneNumber")),
  termsOfService: yup
    .boolean()
    .oneOf([true], t("common.errorMessages.required.termsOfService")),
});
