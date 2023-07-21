import {
  Box,
  CircularProgress,
  Container,
  Stack,
  Step,
  StepLabel,
  Typography,
} from "@mui/material";
import { Form, Formik, FormikProps } from "formik";
import { useTranslations } from "next-intl";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";

import ROUTES from "@/utils/routes";
import { getCommonWhite } from "@/utils/theme";
import { trpc } from "@/utils/trpc";

import {
  providerInitialValues,
  providerValidationSchema,
} from "../shared/schema";
import { StyledButton, StyledStepper } from "../shared/styled-components";
import { BasicData } from "./step-basic-data";
import { PersonalData } from "./step-personal-data";
import { Contacts } from "./step-reference";
import { ProviderFormValues } from "./types";

const ProviderSignUpForm = () => {
  const t = useTranslations();
  const router = useRouter();

  const [actualStep, setActualStep] = useState(0);
  const { data: userData, isFetched } = trpc.user.getUser.useQuery();
  const updateProviderData = trpc.user.createProviderUser.useMutation();

  const steps: Array<{
    id: number;
    label: string;
  }> = [
    {
      id: 0,
      label: t("providerSignUp.stepTitle.one"),
    },
    {
      id: 1,
      label: t("providerSignUp.stepTitle.two"),
    },
    {
      id: 2,
      label: t("providerSignUp.stepTitle.three"),
    },
  ];

  const handlePreviousStep = useCallback(() => {
    setActualStep(actualStep - 1);
  }, [actualStep]);

  const handleNextStep = useCallback(() => {
    setActualStep(actualStep + 1);
  }, [actualStep]);

  const handleOnClick = (props: FormikProps<ProviderFormValues>) => {
    if (actualStep >= steps.length - 1) {
      setActualStep(actualStep + 1);
      props.submitForm();
    } else {
      handleNextStep();
    }
  };

  const handleSubmit = async (values: ProviderFormValues) => {
    await updateProviderData.mutateAsync({
      ...values,
    });
    await router.push(ROUTES.landing);
  };

  if (userData?.email) {
    providerInitialValues["email"] = userData.email;
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
    <Formik
      initialValues={providerInitialValues}
      validationSchema={providerValidationSchema}
      onSubmit={handleSubmit}
    >
      {(props) => (
        <Form className="form flex flex-col items-center">
          <Stack className="flex flex-col items-center">
            <Typography
              variant="h1"
              width="320px"
              height="28px"
              marginTop="28px"
              marginBottom="28px"
              lineHeight="28.4px"
              textAlign="center"
              color="#113F67"
              fontFamily="Poppins"
              fontStyle="normal"
            >
              {t("providerSignUp.title")}
            </Typography>
            <Container className="progressbar">
              <Box width={"100%"} className="mt-2 mb-5">
                <StyledStepper
                  sx={{
                    "& .MuiStepConnector-root": {
                      width: "19px",
                      height: "1px",
                      marginLeft: "28px",
                    },
                    "& .MuiStepLabel-label": {
                      width: "107px",
                      height: "19px",
                      fontStyle: "normal",
                      lineHeight: "157%",
                      textAlign: "center",
                      flex: "none",
                      order: "1",
                      flexGrow: "0",
                    },
                  }}
                  activeStep={actualStep}
                  alternativeLabel
                >
                  {steps.map(({ id, label }) => (
                    <Step key={id}>
                      <StepLabel>{label}</StepLabel>
                    </Step>
                  ))}
                </StyledStepper>
              </Box>
            </Container>
            <Container className="form-container">
              <Box className="body">
                {actualStep === 0 && <BasicData props={props} />}
                {actualStep === 1 && <PersonalData props={props} />}
                {actualStep === 2 && <Contacts props={props} />}
              </Box>
              <Box className="footer flex flex-col items-center mt-5">
                <StyledButton
                  className="bg-primary-dark focus:bg-primary-dark hover:bg-primary-dark w-[290px] h-[48px]"
                  variant="contained"
                  id="continueBtn"
                  disabled={actualStep === steps.length}
                  onClick={(): void => handleOnClick(props)}
                >
                  {actualStep >= steps.length - 1
                    ? t("common.registrationCommon.register")
                    : t("common.continue")}
                </StyledButton>
                <StyledButton
                  className="w-72 h-12 pt-[8px] mt-[8px]"
                  variant="outlined"
                  id="backBtn"
                  hidden={actualStep === 0}
                  onClick={handlePreviousStep}
                  sx={{
                    backgroundColor: { getCommonWhite },
                    border: "2px solid #226597",
                    borderRadius: "70px",
                  }}
                >
                  {t("common.back")}
                </StyledButton>

                <Typography
                  variant="body2"
                  className="mt-1 "
                  height={"28px"}
                  fontWeight={400}
                  lineHeight={"28.26px"}
                >
                  {t("common.registrationCommon.existingAccountQuestion")}{" "}
                  <Typography
                    variant="h5"
                    className="underline text-primary-dark"
                    component="a"
                    onClick={() => router.push(ROUTES.login)}
                  >
                    {t("common.registrationCommon.existingAccountAction")}
                  </Typography>
                </Typography>
              </Box>
            </Container>
          </Stack>
        </Form>
      )}
    </Formik>
  );
};

export default ProviderSignUpForm;
