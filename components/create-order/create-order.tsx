import {
  Box,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  RadioGroup,
  Typography,
} from "@mui/material";
import { ServiceLocation } from "@prisma/client";
import { Form, Formik } from "formik";
import { useTranslations } from "next-intl";
import router from "next/router";
import { useCallback, useState } from "react";
import { object, string } from "yup";

import { getPrimaryDark } from "@/utils/theme";
import { trpc } from "@/utils/trpc";

import { CustomMenuItem, CustomSelect } from "../shared/custom-fields";
import FileSelector from "../shared/file-selector";
import FileUpload from "../shared/file-upload";
import {
  StyledButton,
  StyledInputLabel,
  StyledMultilineInput,
  StyledRadio,
} from "../shared/styled-components";
import TopBar from "../top-bar";
import MENU_PROPS from "./menu-props";

interface CreateOrderProps {
  addressId: string;
  serviceTypeId: string;
  subServiceTypeId: string;
  serviceLocation: ServiceLocation;
  description: string;
}

const CreateOrder = () => {
  const t = useTranslations();
  const { data: serviceTypes } = trpc.serviceType.getServiceTypes.useQuery();
  const { data: addresses } = trpc.address.getAddresses.useQuery();
  const [hasPictures, setHasPictures] = useState<boolean>(false);
  const [pictures, setPictures] = useState<Array<File>>([]);
  const createdOrder = trpc.order.create.useMutation();

  const validationSchema = object().shape({
    addressId: string().trim().required(t("createOrder.errors.address")),
    serviceTypeId: string().trim().required(t("createOrder.errors.service")),
    subServiceTypeId: string()
      .trim()
      .required(t("createOrder.errors.subService")),
  });

  const handleOnDelete = (name?: string) => {
    setPictures(pictures.filter((file) => file.name !== name));
  };

  const handleOnSubmit = useCallback(
    async (values: CreateOrderProps) => {
      await createdOrder.mutateAsync({
        ...values,
      });

      await router.push("/");
    },
    [createdOrder]
  );

  const uploadedFiles = pictures.map((file) => {
    return <FileUpload key={file.name} file={file} onDelete={handleOnDelete} />;
  });

  const initialValues: CreateOrderProps = {
    addressId: "",
    serviceTypeId: "",
    subServiceTypeId: "",
    serviceLocation: ServiceLocation.AT_CLIENT_LOCATION,
    description: "",
  };

  return (
    <>
      <TopBar
        leftIcon="backArrow"
        rightIcon="notification"
        pageTitle={t("createOrder.title")}
        onLeftIconClick={() => router.push("/")}
        onRightIconClick={() => console.log("Notification clicked")}
      />

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleOnSubmit}
      >
        {({
          handleChange,
          handleBlur,
          setFieldValue,
          values,
          touched,
          errors,
        }) => (
          <Form className="fixed flex h-full w-full  flex-col items-center gap-4 pt-8">
            <Box className="flex h-fit w-fit  flex-col gap-2">
              <CustomSelect
                name={"addressId"}
                label={t("createOrder.fields.address")}
                onBlur={handleBlur}
                onChange={handleChange}
              >
                {addresses?.length !== 0 ? (
                  addresses?.map(({ id, alias, street, number }) => {
                    return (
                      <CustomMenuItem key={id.toString()} value={id.toString()}>
                        {`${alias} - ${street}${number ? ", #" + number : ""}`}
                      </CustomMenuItem>
                    );
                  })
                ) : (
                  <CustomMenuItem key={""} value={""}>
                    {t("common.errorMessages.noAddressFound")}
                  </CustomMenuItem>
                )}
              </CustomSelect>
            </Box>
            <Box className="flex h-fit w-fit  flex-col gap-2">
              <Typography
                color={getPrimaryDark}
                className="text-[13px] font-semibold"
              >
                {t("createOrder.subtitles.serviceInfo")}
              </Typography>
              <CustomSelect
                name={"serviceTypeId"}
                label={t("createOrder.fields.service")}
                onBlur={handleBlur}
                onChange={handleChange}
                menuProps={MENU_PROPS}
              >
                {serviceTypes?.length !== 0 ? (
                  serviceTypes?.map(({ id, name }) => {
                    return (
                      <CustomMenuItem key={id.toString()} value={id.toString()}>
                        {name}
                      </CustomMenuItem>
                    );
                  })
                ) : (
                  <CustomMenuItem key={""} value={""}>
                    {t("common.errorMessages.noServiceTypeFound")}
                  </CustomMenuItem>
                )}
              </CustomSelect>

              <CustomSelect
                name={"subServiceTypeId"}
                label={t("createOrder.fields.subService")}
                onBlur={handleBlur}
                onChange={handleChange}
                disabled={!values.serviceTypeId}
                menuProps={MENU_PROPS}
              >
                {serviceTypes?.find(
                  ({ id }) => id.toString() === values.serviceTypeId
                )?.subServicesTypes.length === 0 ? (
                  <CustomMenuItem key={""} value={""}>
                    {serviceTypes?.find(
                      ({ id }) => id.toString() === values.serviceTypeId
                    )?.name +
                      " " +
                      t("common.errorMessages.noSubServiceTypeFound")}
                  </CustomMenuItem>
                ) : (
                  serviceTypes
                    ?.find(({ id }) => id.toString() === values.serviceTypeId)
                    ?.subServicesTypes.map(({ id, name }) => {
                      return (
                        <CustomMenuItem
                          key={id.toString()}
                          value={id.toString()}
                        >
                          {name}
                        </CustomMenuItem>
                      );
                    })
                )}
              </CustomSelect>
              <FormControl
                variant="outlined"
                error={touched.description && Boolean(errors.description)}
              >
                <StyledInputLabel htmlFor="description">
                  {t("createOrder.fields.serviceDescription")}
                </StyledInputLabel>

                <StyledMultilineInput
                  name="description"
                  label={t("createOrder.fields.serviceDescription")}
                  value={values.description}
                  multiline
                  rows={3.25}
                  onChange={handleChange}
                  className="rounded-5 text-xs"
                  inputProps={{ maxLength: 250 }}
                />

                <FormHelperText className="text-right">{`${
                  values?.description?.length ?? 0
                }/250`}</FormHelperText>
              </FormControl>
            </Box>
            <Box className="flex h-fit w-fit  flex-col gap-2">
              <Typography
                color={getPrimaryDark}
                variant="body2"
                className="pb-1"
              >
                {t("createOrder.subtitles.pictures")}
              </Typography>

              <FileSelector
                pictures={pictures}
                setPictures={setPictures}
                setUpload={setHasPictures}
              />

              {hasPictures && <>{uploadedFiles}</>}
            </Box>
            <Box className="flex h-fit w-fit  flex-col gap-2">
              <FormControl className="m-o w-80">
                <FormLabel htmlFor="serviceLocation">
                  <Typography variant="h4" color={getPrimaryDark}>
                    {t("createOrder.fields.serviceLocation")}
                  </Typography>
                </FormLabel>

                <RadioGroup
                  name="serviceLocation"
                  value={values.serviceLocation}
                  onChange={({ target: { name, value } }) => {
                    setFieldValue(name, value);
                  }}
                  className="px-2.5"
                >
                  <FormControlLabel
                    value={ServiceLocation.AT_PROVIDER_LOCATION}
                    control={<StyledRadio />}
                    label={
                      <Typography className="text-[13px] font-normal">
                        {t("createOrder.options.provider")}
                      </Typography>
                    }
                  />
                  <FormControlLabel
                    value={ServiceLocation.AT_CLIENT_LOCATION}
                    control={<StyledRadio />}
                    label={
                      <Typography className="text-[13px] font-normal">
                        {t("createOrder.options.client")}
                      </Typography>
                    }
                  />
                </RadioGroup>
              </FormControl>
            </Box>
            <Box className="fixed bottom-0 flex h-20 w-full flex-row items-center justify-center gap-2 bg-common-white">
              <StyledButton
                className="mt-0 w-[156px] border-2 border-primary-main bg-white hover:border-2 hover:border-primary-main hover:bg-white focus:border-2 focus:border-primary-main focus:bg-white"
                variant="outlined"
              >
                {t("createOrder.buttons.cancel")}
              </StyledButton>

              <StyledButton
                className="mt-0 w-[156px] bg-primary-dark hover:bg-primary-dark focus:bg-primary-dark"
                variant="contained"
                type="submit"
              >
                {t("createOrder.buttons.sendOrder")}
              </StyledButton>
            </Box>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default CreateOrder;
