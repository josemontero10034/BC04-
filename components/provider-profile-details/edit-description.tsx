import { Box } from "@mui/material";
import { Form, Formik } from "formik";
import { useTranslations } from "next-intl";
import router from "next/router";
import { object, string } from "yup";

import ROUTES from "@/utils/routes";

import { DetailedText } from "../shared/custom-fields";
import { StyledButton } from "../shared/styled-components";
import TopBar from "../top-bar";

const EditDesciption = () => {
  const t = useTranslations("profileDetailsProvider");
  const handleOnSubmit = () => {
    router.push(ROUTES.providerProfile);
  };

  const initialValues = {
    description: "",
  };

  const validationSchema = object().shape({
    description: string()
      .trim()
      .required(t("editDescription.requiredDescription")),
  });

  return (
    <Box>
      <>
        <>
          <TopBar
            leftIcon="backArrow"
            pageTitle={t("editDescription.title")}
            onLeftIconClick={() => {
              router.push(ROUTES.providerProfile);
            }}
          />
        </>
      </>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleOnSubmit}
      >
        {({ handleChange, values, touched, errors }) => (
          <Form className="px-2.5 absolute h-full w-full flex flex-col items-center justify-start">
            <Box className="mt-6">
              <DetailedText
                name="description"
                label={t("description")}
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

            <Box className="flex flex-row items-center justify-center w-full h-20 fixed bottom-0 bg-white gap-2">
              <StyledButton
                onClick={handleChange}
                className="font-semibold text-xs w-[156px] h-10 mt-0 bg-white focus:bg-white hover:bg-white border-[2px] rounded-[70px] border-primary-main"
                variant="outlined"
              >
                {t("editDescription.cancel")}
              </StyledButton>
              <StyledButton
                className="font-semibold text-xs w-[156px] h-10 mt-0 bg-primary-dark focus:bg-primary-dark hover:bg-primary-dark"
                variant="contained"
                type="submit"
              >
                {t("editDescription.save")}
              </StyledButton>
            </Box>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default EditDesciption;
