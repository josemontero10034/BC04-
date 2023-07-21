import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import { Box, Divider, Typography } from "@mui/material";
import { Form, Formik } from "formik";
import { useTranslations } from "next-intl";
import Image from "next/image";
import router from "next/router";
import { object, string } from "yup";

import ROUTES from "@/utils/routes";
import { getPrimaryDark } from "@/utils/theme";

import { CustomTextInput, DetailedText } from "./shared/custom-fields";
import { StyledButton } from "./shared/styled-components";
import TopBar from "./top-bar";

const ContactInfo = () => {
  const t = useTranslations();

  const handleOnSubmit = () => {
    router.push(ROUTES.landing);
  };

  const initialValues = {
    topic: "",
    description: "",
  };

  const validationSchema = object().shape({
    topic: string().trim().required(t("contact.required.topic")),
    description: string().trim().required(t("contact.required.description")),
  });

  return (
    <>
      <TopBar
        leftIcon="backArrow"
        pageTitle={t("contact.title")}
        onLeftIconClick={handleOnSubmit}
      />

      <Box className="flex flex-col items-center space-y-6">
        <Image
          src="/assets/images/user-contact-image.svg"
          alt="yhj"
          width={235}
          height={174}
          className="pt-10"
        />

        <Box className="flex flex-row items-center">
          <Image src="/blue-pages-icon.png" alt="me" width="24" height="24" />
          <Typography className="ml-3" variant="h2" color={getPrimaryDark}>
            BLUE PAGES
          </Typography>
        </Box>

        <Box className="flex flex-col items-center space-y-4">
          <Box className="flex flex-row items-center">
            <LocationOnIcon className="fill-primary-main mr-2.5 h-5 w-5" />
            <Typography className="h-10 w-72 font-normal text-[13px]">
              C/ Pablo Pumarol, no. 1, Los Prados, Santo Domingo Oeste
            </Typography>
          </Box>

          <Box className="flex flex-row items-center">
            <PhoneIcon className="fill-primary-main mr-2.5 h-5 w-5" />
            <Typography className=" h-5 w-72 font-normal text-[13px]">
              809-555-4444
            </Typography>
          </Box>

          <Box className="flex flex-row items-center">
            <EmailIcon className="fill-primary-main mr-2.5 h-5 w-5" />
            <Typography className=" h-5 w-72 font-normal text-[13px]">
              info@bluepages.com.do
            </Typography>
          </Box>
        </Box>

        <Divider className="w-70 border-secondary-dark" variant="middle" />
      </Box>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleOnSubmit}
      >
        {({ handleChange, values, touched, errors }) => (
          <Form>
            <Box className="flex flex-col items-center mt-4 space-y-6">
              <Typography variant="h3" color={getPrimaryDark}>
                {t("contact.contactUs")}
              </Typography>

              <CustomTextInput
                name="topic"
                label={t("contact.topic")}
                onChange={handleChange}
              />

              <Box className="pb-20">
                <DetailedText
                  name="description"
                  label={t("contact.description")}
                  maxChar={500}
                  minRows={8}
                  touched={touched.description}
                  value={values.description}
                  error={errors.description}
                  height={"100%"}
                  width={"320px"}
                  handleChange={handleChange}
                />
              </Box>
            </Box>

            <Box className="flex flex-row items-center justify-center w-full h-20 fixed bottom-0 bg-white">
              <StyledButton
                className="w-[322px] mt-0 bg-primary-dark focus:bg-primary-dark hover:bg-primary-dark"
                variant="contained"
                type="submit"
              >
                {t("contact.send")}
              </StyledButton>
            </Box>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default ContactInfo;
