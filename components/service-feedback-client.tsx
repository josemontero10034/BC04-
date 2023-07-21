import CloseIcon from "@mui/icons-material/Close";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import {
  Box,
  Container,
  Dialog,
  FormControl,
  Rating,
  Typography,
} from "@mui/material";
import { Form, Formik } from "formik";
import { useTranslations } from "next-intl";
import Image from "next/image";
import router from "next/router";
import { useState } from "react";

import { getPrimaryDark } from "@/utils/theme";

import { DetailedText } from "./shared/custom-fields";
import { StyledButton } from "./shared/styled-components";
import { SlideUp } from "./shared/transitions";

const ServiceFeedbackClient = () => {
  const t = useTranslations();
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(true);
  const [showTextbox, setShowTextbox] = useState<boolean>(false);

  const initialValues = {
    jobRating: 0,
    customerServiceRating: 0,
    appExperience: 0,
    comment: "",
  };

  const handleClose = () => setIsDialogOpen(false);

  const handleOnSubmit = () => {
    router.push("/");
  };

  return (
    <div>
      <Dialog
        fullScreen
        open={isDialogOpen}
        onClose={handleClose}
        TransitionComponent={SlideUp}
      >
        <CloseIcon
          className="ml-[25.41px] mt-[21.41px] fill-primary-dark"
          onClick={handleClose}
        />
        <Formik initialValues={initialValues} onSubmit={handleOnSubmit}>
          {({ setFieldValue, handleChange, values, touched }) => (
            <Form>
              <Box className="flex flex-col items-center mt-[4px]">
                <Typography
                  className="mt-[20px] mb-[25px]"
                  id="alert-dialog-title"
                  color={getPrimaryDark}
                  variant="h1"
                  justifyContent="center"
                  alignItems="center"
                >
                  {t("serviceFeedbackClient.title")}
                </Typography>
                <Box className="grid justify-items-center justify-self-center">
                  <Image
                    className="justify-items-center"
                    src="/service-feedback-client.png"
                    alt="me"
                    width="201.39px"
                    height="200px"
                  />
                </Box>
                <Container
                  disableGutters
                  className="pt-[20px] h-[100%] w-[292px] space-y-[16px]"
                >
                  <Box className="grid justify-items-center h-[66px]">
                    <Typography className="h-[24px] w-[211px] text-[#242424] text-[15px] font-semibold">
                      {t("serviceFeedbackClient.1stQuestion")}
                    </Typography>
                    <Rating
                      name="jobRating"
                      value={values.jobRating}
                      onChange={(event, newValue) => {
                        setFieldValue("jobRating", newValue);
                      }}
                      icon={<StarIcon className="fill-[#366BD4] ml-2 mr-2" />}
                      emptyIcon={
                        <StarBorderIcon className="fill-[#366BD4] ml-2 mr-2" />
                      }
                      className="mb-[1px]"
                    />
                  </Box>
                  <Box className="grid justify-items-center h-[66px]">
                    <Typography className="h-[24px] w-[249px] text-[#242424] text-[15px] font-semibold">
                      {t("serviceFeedbackClient.2ndQuestion")}
                    </Typography>
                    <Rating
                      name="customerServiceRating"
                      value={values.customerServiceRating}
                      onChange={(event, newValue) => {
                        setFieldValue("customerServiceRating", newValue);
                      }}
                      icon={<StarIcon className="fill-[#366BD4] ml-2 mr-2" />}
                      emptyIcon={
                        <StarBorderIcon className="fill-[#366BD4] ml-2 mr-2" />
                      }
                      className="pt-0"
                    />
                  </Box>

                  <Box className="grid justify-items-center h-[90px]">
                    <Typography className="h-[48px] w-[292px] text-[#242424] text-center text-[15px] font-semibold">
                      {t("serviceFeedbackClient.3rdQuestion")}
                    </Typography>
                    <Rating
                      name="appExperience"
                      value={values.appExperience}
                      onChange={(event, newValue) => {
                        setFieldValue("appExperience", newValue);
                      }}
                      icon={<StarIcon className="fill-[#366BD4] ml-2 mr-2" />}
                      emptyIcon={
                        <StarBorderIcon className="fill-[#366BD4] ml-2 mr-2" />
                      }
                      className="pt-0"
                    />
                  </Box>
                  <Box className="grid justify-items-center mb-[100%]">
                    <Typography
                      className="text-primary-dark underline mb-[41px] h-[22px]"
                      variant="h4"
                      component="a"
                      hidden={showTextbox}
                      onClick={() => setShowTextbox(true)}
                    >
                      {t("serviceFeedbackClient.comment")}
                    </Typography>
                    {showTextbox && (
                      <FormControl
                        variant="outlined"
                        className="mt-4 mb-[15px]"
                      >
                        <DetailedText
                          name="comment"
                          label={t("serviceFeedbackClient.commentLabel")}
                          value={values.comment}
                          touched={touched.comment}
                          handleChange={handleChange}
                          minRows={4}
                          maxChar={500}
                          height={"100%"}
                          width={"320px"}
                          error={undefined}
                        />
                      </FormControl>
                    )}
                  </Box>

                  <Container
                    className="grid justify-items-center z-10"
                    disableGutters
                  >
                    <StyledButton
                      className="bg-primary-dark focus:bg-primary-dark hover:bg-primary-dark disabled:bg-[#8BB1CE] disabled:text-white w-[290px] h-[48px] mb-[22.53px] "
                      type="submit"
                      variant="contained"
                      disabled={
                        values.jobRating === 0 ||
                        values.customerServiceRating === 0 ||
                        values.appExperience === 0
                      }
                    >
                      {t("serviceFeedbackClient.sent")}
                    </StyledButton>
                  </Container>
                </Container>
              </Box>
            </Form>
          )}
        </Formik>
      </Dialog>
    </div>
  );
};

export default ServiceFeedbackClient;
