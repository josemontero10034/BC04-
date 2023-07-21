import { Close } from "@mui/icons-material";
import {
  Box,
  CircularProgress,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { UserGender } from "@prisma/client";
import { Form, Formik } from "formik";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useRouter } from "next/router";

import ROUTES from "@/utils/routes";
import { getPrimaryDark } from "@/utils/theme";
import { trpc } from "@/utils/trpc";

import useToggle from "../../hooks/useToggle";
import {
  CustomCheckbox,
  CustomFormControl,
  CustomMenuItem,
  CustomPhoneInput,
  CustomSelect,
} from "../shared/custom-fields";
import { StyledButton } from "../shared/styled-components";
import TopBar from "../top-bar";
import {
  ClientFormValues,
  clientInitialValues,
  clientValidationSchema,
} from "./types";

const ClientSignUpForm = () => {
  const t = useTranslations();
  const router = useRouter();
  const { data: userData, isFetched } = trpc.user.getUser.useQuery();
  const createClientData = trpc.user.createClientUser.useMutation();

  const translatedUserGender: Record<UserGender, string> = {
    MALE: `${t("common.genderValue.male")}`,
    FEMALE: `${t("common.genderValue.female")}`,
    OTHER: `${t("common.genderValue.other")}`,
    PREFER_NOT_TO_SAY: `${t("common.genderValue.preferNotToSay")}`,
  };

  const { status: modalOpen, statusToggler: toggleModalOpen } =
    useToggle(false);

  const handleModalClose = () => {
    toggleModalOpen();
  };

  const handleModalOpen = () => {
    toggleModalOpen();
  };

  const handleSubmit = async (values: ClientFormValues) => {
    await createClientData.mutateAsync({
      ...values,
    });
    router.push(ROUTES.landing);
  };

  if (userData?.email) {
    clientInitialValues["email"] = userData.email;
  }

  if (!isFetched) {
    return (
      <Box className="w-screen h-full flex flex-col justify-center items-center gap-5">
        <CircularProgress />
        <Typography>{t("chargingMessage")}</Typography>
      </Box>
    );
  }

  return (
    <>
      <TopBar
        leftIcon={
          <Box className="flex items-center">
            <Image src="/blue-pages-icon.png" alt="me" width="30" height="30" />
            <Typography
              variant="h3"
              className="ml-2 uppercase text-primary-dark font-medium"
            >
              Blue Pages
            </Typography>
          </Box>
        }
      />
      <Formik
        initialValues={clientInitialValues}
        validationSchema={clientValidationSchema}
        onSubmit={handleSubmit}
      >
        {({
          getFieldProps,
          handleBlur,
          handleChange,
          values,
          setFieldValue,
          isValid,
          dirty,
        }) => {
          return (
            <Form className="form flex-col items-center pt-[29px]">
              <Stack className="flex flex-col items-center space-y-[24px]">
                <Typography variant="h1" color={getPrimaryDark}>
                  {t("clientSignUpForm.title")}
                </Typography>
                <Container
                  disableGutters
                  maxWidth={false}
                  className="flex flex-col justify-center items-center"
                >
                  <Container
                    className="flex justify-center"
                    disableGutters
                    maxWidth={false}
                  >
                    <Box className="w-full flex flex-col justify-center items-center gap-5">
                      <Stack className="w-full flex flex-col justify-center items-center gap-4">
                        <CustomFormControl
                          label={t("common.firstName")}
                          {...getFieldProps("firstName")}
                        />
                        <CustomFormControl
                          label={t("common.lastName")}
                          {...getFieldProps("lastName")}
                        />
                        <CustomSelect
                          label={t("common.gender")}
                          {...getFieldProps("gender")}
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
                      </Stack>
                      <Stack className="w-full flex flex-col justify-center items-center gap-4">
                        <Typography
                          variant="subtitle1"
                          className="text-primary-dark w-80 text-left"
                        >
                          {t("clientSignUpForm.conactInfo.title")}
                        </Typography>
                        <CustomFormControl
                          label={t("common.email")}
                          {...getFieldProps("email")}
                          disabled={values.email !== ""}
                        />
                        <CustomPhoneInput
                          label={t(
                            "clientSignUpForm.conactInfo.personalPhone.title"
                          )}
                          {...getFieldProps("personalPhone")}
                        />
                        <Dialog
                          open={modalOpen}
                          PaperProps={{
                            className: "m-0 rounded-2xl w-11/12 h-1/2",
                          }}
                        >
                          <IconButton
                            className="absolute self-end text-primary-dark"
                            onClick={handleModalClose}
                          >
                            <Close className="h-6 w-6" />
                          </IconButton>
                          <DialogTitle className="mt-4 font-semibold text-lg text-center">
                            {t("clientSignUpForm.termsOfService.title")}
                          </DialogTitle>
                          <DialogContent className="text-center p-0 px-5 text-sm">
                            {t("clientSignUpForm.termsOfService.content")}
                          </DialogContent>
                          <DialogActions className="flex flex-row justify-center items-center w-full gap-10 p-4">
                            <Typography
                              className="font-poppins font-semibold text-sm leading-normal text-center text-error-dark underline"
                              onClick={() => {
                                handleModalClose();
                                setFieldValue("termsOfService", false);
                              }}
                            >
                              {t("common.buttons.reject")}
                            </Typography>
                            <Typography
                              className="font-poppins font-semibold text-sm leading-normal text-center text-primary-dark underline"
                              onClick={() => {
                                handleModalClose();
                                setFieldValue("termsOfService", true);
                              }}
                            >
                              {t("common.buttons.accept")}
                            </Typography>
                          </DialogActions>
                        </Dialog>
                        <CustomCheckbox
                          onClick={handleModalOpen}
                          checked={values.termsOfService}
                          label={t(
                            "common.registrationCommon.termsAndConditionsText"
                          )}
                          {...getFieldProps("termsOfService")}
                        />
                      </Stack>
                    </Box>
                  </Container>
                  <Box className="flex flex-col items-center fixed bottom-0 h-[15%]">
                    <StyledButton
                      className={`w-[320px] h-[45px] sm:w-[80%] sm:h-[50px] rounded-full text-xs ${
                        !isValid || !dirty ? "bg-gray-300" : "bg-primary-dark"
                      }`}
                      variant={!isValid || !dirty ? "outlined" : "contained"}
                      id="continueBtn"
                      onClick={() => void handleSubmit(values)}
                      disabled={!isValid || !dirty}
                    >
                      {t("common.registrationCommon.register")}
                    </StyledButton>
                  </Box>
                </Container>
              </Stack>
            </Form>
          );
        }}
      </Formik>
    </>
  );
};

export default ClientSignUpForm;
