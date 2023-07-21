import CloseIcon from "@mui/icons-material/Close";
import CreateIcon from "@mui/icons-material/Create";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import {
  Box,
  Dialog,
  FormControl,
  FormHelperText,
  Rating,
  Typography,
} from "@mui/material";
import { Form, Formik } from "formik";
import { useTranslations } from "next-intl";
import Image from "next/image";
import router from "next/router";
import { Fragment, useCallback, useState } from "react";

import { getPrimaryDark } from "@/utils/theme";

import { CustomChip } from "./shared/custom-fields";
import {
  StyledButton,
  StyledInputLabel,
  StyledOutlinedInput,
} from "./shared/styled-components";
import { SlideUp } from "./shared/transitions";

const ServiceFeedbackProvider = () => {
  const t = useTranslations("serviceFeedbackProvider");
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(true);
  const [hasCustomQualification, setHasCustomQualification] =
    useState<boolean>(false);

  const initialValues = {
    clientRating: 0,
    clientQualification: "",
    customQualification: "",
  };

  const handleClose = () => setIsDialogOpen(false);

  const handleOnSubmit = useCallback(() => {
    router.push("/");
  }, []);

  const qualifications = [
    t("qualifications.kind"),
    t("qualifications.attentive"),
    t("qualifications.quickResponse"),
    t("qualifications.responsible"),
  ];

  return (
    <Dialog fullScreen open={isDialogOpen} TransitionComponent={SlideUp}>
      <Box className="px-5 mt-[42px]">
        <CloseIcon
          sx={{ fontSize: "24px" }}
          className="fill-primary-dark"
          onClick={handleClose}
        />

        <Formik initialValues={initialValues} onSubmit={handleOnSubmit}>
          {({ handleChange, setFieldValue, values }) => (
            <Form>
              <Box className="flex flex-col items-center mt-4">
                <Typography
                  variant="h1"
                  color={getPrimaryDark}
                  className="pb-8"
                >
                  {t("title")}
                </Typography>

                <Image
                  src="/assets/images/service-feedback-provider.svg"
                  alt=""
                  width={291.96}
                  height={210}
                />

                <Typography className="text-[15px] font-semibold pt-6">
                  {t("subtitles.rating")}
                </Typography>

                <Rating
                  name="clientRating"
                  value={values.clientRating}
                  onChange={(event, newValue) => {
                    setFieldValue("clientRating", newValue);
                  }}
                  icon={<StarIcon className="fill-[#366BD4] ml-2 mr-2" />}
                  emptyIcon={
                    <StarBorderIcon className="fill-[#366BD4] ml-2 mr-2" />
                  }
                  className="pt-4"
                />

                <Typography className="text-[15px] font-semibold pt-6">
                  {t("subtitles.qualification")}
                </Typography>

                <Box className="pt-4">
                  <>
                    {qualifications.map((item) => {
                      return (
                        <Fragment key={item}>
                          <CustomChip
                            label={item}
                            value={values.clientQualification}
                            className="mr-2 mb-4"
                            onClick={() => {
                              setHasCustomQualification(false);
                              setFieldValue("clientQualification", item);
                            }}
                          />
                        </Fragment>
                      );
                    })}

                    <CustomChip
                      label={t("qualifications.other")}
                      value={values.clientQualification}
                      className="mb-4"
                      onClick={() => {
                        setHasCustomQualification(true);
                        setFieldValue(
                          "clientQualification",
                          t("qualifications.other")
                        );
                      }}
                      endAdornment={<CreateIcon className="fill-[#366BD4]" />}
                    />
                  </>
                </Box>

                <Box className={hasCustomQualification ? "" : "invisible"}>
                  <FormControl variant="outlined" className="mt-4 mb-6">
                    <StyledInputLabel htmlFor="customQualification">
                      {t("customQualification.label")}
                    </StyledInputLabel>

                    <StyledOutlinedInput
                      name="customQualification"
                      label={t("customQualification.label")}
                      value={values.customQualification}
                      onChange={handleChange}
                      className="h-[45px] w-[320px] sm:m-w-3/4 rounded-full text-xs"
                    />

                    <FormHelperText>
                      {t("customQualification.helperText")}
                    </FormHelperText>
                  </FormControl>
                </Box>

                <StyledButton
                  className="w-[290px] sm:w-1/2 my-4 bg-primary-dark focus:bg-primary-dark hover:bg-primary-dark disabled:bg-[#8BB1CE] disabled:text-white"
                  variant="contained"
                  type="submit"
                  disabled={
                    values.clientQualification === "" ||
                    values.clientRating === 0
                  }
                >
                  {t("sendFeedback")}
                </StyledButton>
              </Box>
            </Form>
          )}
        </Formik>
      </Box>
    </Dialog>
  );
};

export default ServiceFeedbackProvider;
