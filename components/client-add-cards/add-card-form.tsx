import CreditCardIcon from "@mui/icons-material/CreditCard";
import { Box, Container, FormHelperText, MenuItem } from "@mui/material";
import { Form, Formik } from "formik";
import { useTranslations } from "next-intl";
import React from "react";
import { object, string } from "yup";

import { countryList, translatedList } from "@/utils/constants";

import { CustomSelect } from "../shared/custom-fields";
import { CardIdMask, CvvMask, ValidDateMask } from "../shared/input-masks";
import {
  StyledButton,
  StyledFormControl,
  StyledInputLabel,
  StyledOutlinedInput,
} from "../shared/styled-components";
import { CardObject, SetCurrentProps } from "./types";

export const AddCardForm = ({
  setStage,
  stage,
  addingNewCard,
  updateCard,
  currentValue,
  setCurrentTitle,
}: SetCurrentProps) => {
  const t = useTranslations();

  const newCountryList = translatedList(
    countryList,
    "cards.addNewCardForm.countries"
  ).sort();

  const validationSchema = object().shape({
    cardId: string().trim().required(t("cards.addNewCardForm.errors.cardId")),
    expiredDate: string()
      .trim()
      .required(t("cards.addNewCardForm.errors.expDate")),
    country: string().trim(),
    owner: string().trim().required(t("cards.addNewCardForm.errors.owner")),
  });

  const handleSubmit = (values: CardObject) => {
    if (stage === "addCard") {
      setCurrentTitle(t("cards.title"));
      addingNewCard(values);
    } else if (stage === "editForm") {
      updateCard(values, currentValue);
      setCurrentTitle(t("cards.title"));
    }
  };

  return (
    <Formik
      validationSchema={validationSchema}
      initialValues={currentValue}
      onSubmit={(values) => {
        handleSubmit(values);
        setStage("closed");
      }}
    >
      {({ values, errors, handleBlur, handleChange, touched }) => (
        <Form>
          <Box
            marginTop="30px"
            minHeight={228}
            width={320}
            display="flex"
            flexDirection="column"
            className="gap-y-4"
            justifyItems={"center"}
          >
            <StyledFormControl onBlur={handleBlur} variant={"outlined"}>
              <StyledInputLabel
                id="cardId"
                htmlFor="cardId"
                className="text-primary-dark"
              >
                {t("cards.addNewCardForm.cardNumber")}
              </StyledInputLabel>

              <StyledOutlinedInput
                className="h-[45px] w-[320px] sm:m-w-3/4 rounded-full text-xs p-[0px]"
                value={values.cardId}
                onChange={handleChange}
                name="cardId"
                placeholder=""
                label={t("cards.addNewCardForm.cardNumber")}
                inputComponent={CardIdMask as any}
                endAdornment={
                  <Box className="m-[5px] position-end">
                    <CreditCardIcon />
                  </Box>
                }
              />
              <FormHelperText className="text-error-dark">
                {touched.cardId ? errors.cardId : null}
              </FormHelperText>
            </StyledFormControl>
            <div className="flex gap-[16px]">
              <StyledFormControl onBlur={handleBlur} variant={"outlined"}>
                <StyledInputLabel id="expiredDate" htmlFor="expiredDate">
                  {t("cards.addNewCardForm.expiredDate")}
                </StyledInputLabel>
                <StyledOutlinedInput
                  className="h-[45px] w-[152px] sm:m-w-3/4 rounded-full text-xs"
                  value={values.expiredDate}
                  onChange={handleChange}
                  name="expiredDate"
                  placeholder="mm/yy"
                  label={t("cards.addNewCardForm.expiredDate")}
                  inputComponent={ValidDateMask as any}
                />
                <FormHelperText className="w-[120px] text-center text-error-dark">
                  {touched.expiredDate ? errors.expiredDate : null}
                </FormHelperText>
              </StyledFormControl>
              <StyledFormControl onBlur={handleBlur} variant={"outlined"}>
                <StyledInputLabel id="cvv" htmlFor="cvv">
                  {t("cards.addNewCardForm.cvv")}
                </StyledInputLabel>
                <StyledOutlinedInput
                  className="h-[45px] w-[152px] sm:m-w-3/4 rounded-full text-xs"
                  value={values.cvv}
                  onChange={handleChange}
                  disabled
                  name="cvv"
                  placeholder="000"
                  label={t("cards.addNewCardForm.cvv")}
                  inputComponent={CvvMask as any}
                />
              </StyledFormControl>
            </div>
            <CustomSelect
              name="country"
              label={t("cards.addNewCardForm.country")}
              onBlur={handleBlur}
              onChange={handleChange}
            >
              {newCountryList.map((item) => (
                <MenuItem key={item} value={item}>
                  {item}
                </MenuItem>
              ))}
            </CustomSelect>
            <StyledFormControl onBlur={handleBlur} variant={"outlined"}>
              <StyledInputLabel id="owner" htmlFor="owner">
                {t("cards.addNewCardForm.owner")}
              </StyledInputLabel>
              <StyledOutlinedInput
                className="h-[45px] w-[320px] sm:m-w-3/4 rounded-full text-xs"
                value={values.owner}
                onChange={handleChange}
                name="owner"
                placeholder=""
                label={t("cards.addNewCardForm.owner")}
              />
              <FormHelperText className="text-error-dark">
                {touched.owner ? errors.owner : null}
              </FormHelperText>
            </StyledFormControl>
          </Box>
          <Container disableGutters maxWidth={false}>
            <Box className="flex flex-row space-x-2 mt-[379px]">
              <StyledButton
                className="w-[156px] h-10 mt-0 font-semibold text-xs border-2 focus:border-2 hover:border-2 border-primary-main focus:border-primary-main hover:border-primary-main bg-white focus:bg-white hover:bg-white"
                variant="outlined"
                onClick={() => {
                  setCurrentTitle(t("cards.title"));
                  setStage("closed");
                }}
              >
                {t("cards.addNewCardForm.cancel")}
              </StyledButton>

              <StyledButton
                className="w-[156px] h-10 mt-0 font-semibold text-xs bg-primary-dark focus:bg-primary-dark hover:bg-primary-dark"
                variant="contained"
                type="submit"
              >
                {t("cards.addNewCardForm.save")}
              </StyledButton>
            </Box>
          </Container>
        </Form>
      )}
    </Formik>
  );
};
