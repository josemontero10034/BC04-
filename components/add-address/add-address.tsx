import CreateIcon from "@mui/icons-material/Create";
import {
  Box,
  Container,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  RadioGroup,
  Typography,
} from "@mui/material";
import { Form, Formik } from "formik";
import { useTranslations } from "next-intl";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";
import { number, object, string } from "yup";

import ROUTES from "@/utils/routes";
import { getPrimaryDark } from "@/utils/theme";
import { trpc } from "@/utils/trpc";

import {
  CustomChip,
  CustomMenuItem,
  CustomSelect,
  CustomTextInput,
  DetailedText,
} from "../shared/custom-fields";
import {
  StyledButton,
  StyledInputLabel,
  StyledOutlinedInput,
  StyledRadio,
} from "../shared/styled-components";
import TopBar from "../top-bar";
import { AddAddressFormValues } from "./types";

const AddAddress = () => {
  const router = useRouter();
  const t = useTranslations("addAddressForm");
  const d = useTranslations();
  const [hasCustomAddressName, setHasCustomAddressName] = useState(false);
  const [mainAddressError, setMainAddressError] = useState("");
  const { data: addresses } = trpc.address.getAddresses.useQuery();

  const addressMutator = trpc.address.create.useMutation();

  const [provinceId, setProvinceId] = useState<number | undefined>();
  const [cityId, setCityId] = useState<number | undefined>();
  const [sectorId, setSectorId] = useState<number | undefined>();

  const { data: provinces } = trpc.address.getProvinces.useQuery();
  const { data: cities, refetch: refetchCities } =
    trpc.address.getCities.useQuery(
      provinceId ? { provinceId } : { provinceId: 0 }
    );

  const { data: sectors, refetch: refetchSectors } =
    trpc.address.getSectors.useQuery(cityId ? { cityId } : { cityId: 0 });

  const { data: subSectors, refetch: refetchSubSectors } =
    trpc.address.getSubSectors.useQuery(
      sectorId ? { sectorId } : { sectorId: 0 }
    );

  const initialValues = {
    street: "",
    number: "",
    provinceId: undefined,
    cityId: undefined,
    sectorId: undefined,
    subSectorId: undefined,
    references: "",
    isMainAddress: false,
    alias: "",
  } as AddAddressFormValues;

  const validationSchema = object().shape({
    street: string().trim().required(t("errors.address")),
    number: string().trim().required(t("errors.building")),
    provinceId: number().required(t("errors.province")),
    cityId: number().required(t("errors.city")),
    sectorId: number().required(t("errors.sector")),
  });

  const handleOnSubmit = useCallback(
    (values: AddAddressFormValues) => {
      if (
        values.isMainAddress &&
        addresses?.find((address) => address.isMainAddress === true)
      ) {
        setMainAddressError(t("errors.isMainAddress"));
      } else {
        addressMutator.mutateAsync(values).then(() => {
          router.push(ROUTES.addressViewDelete);
        });
      }
    },
    [addressMutator, addresses, router, t]
  );

  return (
    <>
      <TopBar leftIcon="backArrow" pageTitle={t("addAddress")} />
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
          <Form>
            <Container className="flex items-center flex-col space-y-6 px-1 translate-y-10">
              <Container className="flex items-center flex-col space-y-4 px-0">
                <CustomTextInput
                  name="street"
                  label={t("fields.street")}
                  onChange={handleChange}
                />

                <CustomTextInput
                  name="number"
                  label={t("fields.number")}
                  onChange={handleChange}
                />

                <CustomSelect
                  name="provinceId"
                  label={t("fields.province")}
                  onBlur={handleBlur}
                  onChange={({ target: { value, name } }) => {
                    setProvinceId(Number(value));
                    setFieldValue(name, Number(value));
                    refetchCities();
                    refetchSectors();
                    refetchSubSectors();
                  }}
                >
                  {!provinces ? (
                    <CustomMenuItem key={0} value={0}>
                      {d("common.loading.provinces")}
                    </CustomMenuItem>
                  ) : (
                    provinces.map(({ id, name }) => {
                      return (
                        <CustomMenuItem key={id.toString()} value={Number(id)}>
                          {name}
                        </CustomMenuItem>
                      );
                    })
                  )}
                </CustomSelect>

                <CustomSelect
                  name="cityId"
                  label={t("fields.city")}
                  onBlur={handleBlur}
                  onChange={({ target: { value, name } }) => {
                    setCityId(Number(value));
                    setFieldValue(name, Number(value));
                    refetchSectors();
                    refetchSubSectors();
                  }}
                >
                  {!cities ? (
                    <CustomMenuItem key={0} value={0}>
                      {d("common.loading.cities")}
                    </CustomMenuItem>
                  ) : (
                    cities.map(({ id, name }) => {
                      return (
                        <CustomMenuItem key={id.toString()} value={Number(id)}>
                          {name}
                        </CustomMenuItem>
                      );
                    })
                  )}
                </CustomSelect>

                <CustomSelect
                  name="sectorId"
                  label={t("fields.sector")}
                  onBlur={handleBlur}
                  onChange={({ target: { value, name } }) => {
                    setSectorId(Number(value));
                    setFieldValue(name, Number(value));
                    refetchSubSectors();
                  }}
                >
                  {!sectors ? (
                    <CustomMenuItem key={0} value={0}>
                      {d("common.loading.sectors")}
                    </CustomMenuItem>
                  ) : (
                    sectors.map(({ id, name }) => {
                      return (
                        <CustomMenuItem key={id.toString()} value={Number(id)}>
                          {name}
                        </CustomMenuItem>
                      );
                    })
                  )}
                </CustomSelect>

                <CustomSelect
                  name="subSectorId"
                  label={t("fields.subSector")}
                  onBlur={handleBlur}
                  onChange={({ target: { value, name } }) => {
                    setFieldValue(name, Number(value));
                  }}
                >
                  {!subSectors ? (
                    <CustomMenuItem key={0} value={0}>
                      {d("common.loading.subSectors")}
                    </CustomMenuItem>
                  ) : (
                    subSectors.map(({ id, name }) => {
                      return (
                        <CustomMenuItem key={id.toString()} value={Number(id)}>
                          {name}
                        </CustomMenuItem>
                      );
                    })
                  )}
                </CustomSelect>

                <DetailedText
                  name="references"
                  label={t("fields.references")}
                  error={errors.references}
                  touched={touched.references}
                  value={values.references!}
                  maxChar={100}
                  minRows={3}
                  handleChange={handleChange}
                  height="85px"
                  width="320px"
                />
              </Container>

              <Container className="w-[320px] flex items-left flex-col space-y-4 px-0">
                <FormControl error={mainAddressError !== ""}>
                  <FormLabel htmlFor="isMainAddress">
                    <Typography
                      variant="h4"
                      color={mainAddressError === "" ? getPrimaryDark : "error"}
                    >
                      {t("fields.isMainAddress.title")}
                    </Typography>
                  </FormLabel>

                  <RadioGroup
                    name="isMainAddress"
                    value={values.isMainAddress}
                    onChange={({ target: { name, value } }) =>
                      setFieldValue(name, value === "true")
                    }
                    className="px-2.5"
                  >
                    <FormControlLabel
                      value={true}
                      control={<StyledRadio />}
                      label={
                        <Typography className="font-normal text-[13px]">
                          {t("fields.isMainAddress.options.yes")}
                        </Typography>
                      }
                    />
                    <FormControlLabel
                      value={false}
                      control={<StyledRadio />}
                      label={
                        <Typography className="font-normal text-[13px]">
                          {t("fields.isMainAddress.options.no")}
                        </Typography>
                      }
                    />
                  </RadioGroup>

                  <FormHelperText className="mx-0 text-xs font-medium">
                    {mainAddressError}
                  </FormHelperText>
                </FormControl>

                <FormControl>
                  <FormLabel>
                    <Typography variant="h4" color={getPrimaryDark}>
                      {t("fields.alias.title")}
                    </Typography>
                  </FormLabel>

                  <Container className="flex items-left flex-row mt-2 space-x-2 px-0">
                    <CustomChip
                      label={t("fields.alias.options.home")}
                      value={values.alias!}
                      onClick={() => {
                        setHasCustomAddressName(false);
                        setFieldValue("alias", t("fields.alias.options.home"));
                      }}
                    />

                    <CustomChip
                      label={t("fields.alias.options.work")}
                      value={values.alias!}
                      onClick={() => {
                        setHasCustomAddressName(false);
                        setFieldValue("alias", t("fields.alias.options.work"));
                      }}
                    />

                    <CustomChip
                      label={t("fields.alias.options.other")}
                      value={values.alias!}
                      onClick={() => {
                        setHasCustomAddressName(true);
                        setFieldValue("alias", t("fields.alias.options.other"));
                      }}
                      endAdornment={<CreateIcon className="fill-[#366BD4]" />}
                    />
                  </Container>
                </FormControl>
              </Container>

              <Box className={hasCustomAddressName ? "" : "invisible"}>
                <FormControl variant="outlined">
                  <StyledInputLabel htmlFor="alias">
                    {t("fields.alias.label")}
                  </StyledInputLabel>

                  <StyledOutlinedInput
                    name="alias"
                    label={t("fields.alias.label")}
                    value={values.alias}
                    onChange={handleChange}
                    className="h-[45px] w-[320px] sm:m-w-3/4 rounded-full text-xs"
                  />

                  <FormHelperText>
                    {t("fields.alias.helperText")}
                  </FormHelperText>
                </FormControl>
              </Box>

              <StyledButton
                className="w-[290px] sm:w-1/2 mb-4 bg-primary-dark focus:bg-primary-dark hover:bg-primary-dark"
                variant="contained"
                type="submit"
              >
                {t("addAddress")}
              </StyledButton>
            </Container>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default AddAddress;
