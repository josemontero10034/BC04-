import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  Container,
  IconButton,
  InputAdornment,
  Stack,
  Typography,
} from "@mui/material";
import { Form, Formik } from "formik";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";
import { object, string } from "yup";

import ROUTES from "@/utils/routes";
import { getPrimaryDark } from "@/utils/theme";
import { trpc } from "@/utils/trpc";

import { CustomTextInput } from "./shared/custom-fields";
import { StyledButton } from "./shared/styled-components";

const Login = () => {
  const router = useRouter();
  const t = useTranslations("login");
  const [showPassword, setShowPassword] = useState(false);

  const initialValues = {
    username: "",
    password: "",
  };

  const validationSchema = object().shape({
    username: string().trim().required(t("errorMessages.required")),
    password: string().trim().required(t("errorMessages.required")),
  });

  const handleOnSubmit = useCallback(() => router.push("/"), [router]);
  const togglePasswordVisibility = useCallback(
    () => setShowPassword((show) => !show),
    []
  );

  const updateStatus = trpc.orderOffer.updateStatus.useMutation();

  updateStatus.mutate({ status: "ACCEPTED", orderOfferId: "1" });

  return (
    <Container className="flex items-center flex-col space-y-3 pt-4 px-0">
      <Typography variant="h1" color={getPrimaryDark}>
        {t("title")}
      </Typography>

      <Box className="mt-3">
        <Image src="/assets/icons/login.svg" alt="" width={330} height={330} />
      </Box>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleOnSubmit}
      >
        {({ handleChange }) => (
          <Form>
            <Container className="flex items-center flex-col space-y-6">
              <Container className="flex items-center flex-col space-y-4">
                <CustomTextInput
                  name="username"
                  label={t("labels.username")}
                  onChange={handleChange}
                />

                <CustomTextInput
                  name="password"
                  label={t("labels.password")}
                  type={showPassword ? "text" : "password"}
                  onChange={handleChange}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton onClick={togglePasswordVisibility} edge="end">
                        {showPassword ? (
                          <VisibilityOff className="fill-primary-main" />
                        ) : (
                          <Visibility className="fill-primary-main" />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </Container>

              <StyledButton
                className="bg-primary-dark focus:bg-primary-dark w-[290px] sm:w-full hover:bg-primary-dark"
                variant="contained"
                type="submit"
                onClick={() => router.push(ROUTES.landing)}
              >
                {t("submitButton")}
              </StyledButton>
            </Container>
          </Form>
        )}
      </Formik>

      <Stack className="space-y-2 items-center">
        <Stack className="space-x-1 flex-row">
          <Typography variant="body2">{t("forgotPassword.label")}</Typography>

          <Typography
            component="a"
            className="underline"
            color={getPrimaryDark}
            onClick={() => router.push(ROUTES.forgotPassword)}
            variant="h5"
          >
            {t("forgotPassword.link")}
          </Typography>
        </Stack>

        <Stack className="space-x-1 flex-row">
          <Typography variant="body2">{t("registerAccount.label")}</Typography>

          <Typography
            component="a"
            className="underline"
            onClick={() => router.push(ROUTES.selectAccountType)}
            color={getPrimaryDark}
            variant="h5"
          >
            {t("registerAccount.link")}
          </Typography>
        </Stack>
      </Stack>
    </Container>
  );
};

export default Login;
