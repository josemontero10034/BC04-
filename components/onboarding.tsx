import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { size } from "lodash";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";

import ROUTES from "@/utils/routes";
import { getPrimaryMain } from "@/utils/theme";

import CustomStepper from "./custom-stepper/custom-stepper";
import { StyledButton } from "./shared/styled-components";

const Onboarding = () => {
  const t = useTranslations();
  const router = useRouter();

  const [currentStep, setCurrentStep] = useState(1);

  const steps: Record<number, { title: string; subtitle: string }> = {
    1: { title: t("onboarding.title1"), subtitle: t("onboarding.subtitle1") },
    2: { title: t("onboarding.title2"), subtitle: t("onboarding.subtitle2") },
    3: { title: t("onboarding.title3"), subtitle: t("onboarding.subtitle3") },
    4: { title: t("onboarding.title4"), subtitle: t("onboarding.subtitle4") },
  };

  return (
    <>
      <Container className="flex items-center flex-col pt-5">
        <Image
          src={`/onboarding-image-${currentStep}.svg`}
          width={320}
          height={320}
          alt={steps[currentStep]?.title}
        />
        <Typography variant="h2" className="mt-6" color={getPrimaryMain}>
          {steps[currentStep]?.title}
        </Typography>
        <Typography
          className="mt-4 text-center"
          variant="body1"
          color={"getPrimaryMain"}
        >
          {steps[currentStep]?.subtitle}
        </Typography>
        <CustomStepper
          className="mt-6"
          currentStep={currentStep}
          numberOfSteps={4}
        />
        <StyledButton
          className="mt-10 bg-primary-dark focus:bg-primary-dark"
          variant="contained"
          onClick={() => {
            if (currentStep < size(steps)) {
              setCurrentStep((current) => current + 1);
            } else {
              router.push(ROUTES.selectAccountType);
            }
          }}
        >
          {t("common.continue")}
        </StyledButton>
        <StyledButton
          onClick={() => router.push(ROUTES.selectAccountType)}
          className="underline mt-2"
        >
          {t("common.skip")}
        </StyledButton>
      </Container>
    </>
  );
};

export default Onboarding;
