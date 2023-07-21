import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  RadioGroup,
  Stack,
  Typography,
} from "@mui/material";
import { useTranslations } from "next-intl";
import React, { useEffect, useState } from "react";

import { trpc } from "@/utils/trpc";

import {
  CustomFormControl,
  CustomMenuItem,
  CustomSelect,
} from "../shared/custom-fields";
import FileSelector from "../shared/file-selector";
import FileUpload from "../shared/file-upload";
import { IDMask } from "../shared/input-masks";
import {
  StyledFormControl,
  StyledInputLabel,
  StyledOutlinedInput,
  StyledRadio,
} from "../shared/styled-components";
import { ProviderCustomProps } from "./types";

export const PersonalData = ({
  props: { errors, touched, values, handleChange, handleBlur, setFieldValue },
}: ProviderCustomProps) => {
  const t = useTranslations();
  const [hasPictures, setHasPictures] = useState<boolean>(false);
  const [pictures, setPictures] = useState<Array<File>>([]);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const { data: provinces } = trpc.address.getProvinces.useQuery();
  const { data: cities, refetch: refetchCities } =
    trpc.address.getCities.useQuery({
      provinceId: values.provinceId as number,
    });

  const { data: sectors, refetch: refetchSectors } =
    trpc.address.getSectors.useQuery({
      cityId: values.cityId as number,
    });

  const { data: subSectors, refetch: refetchSubSectors } =
    trpc.address.getSubSectors.useQuery({
      sectorId: values.sectorId as number,
    });

  const handleOnDelete = (name?: string) => {
    setPictures(pictures.filter((file) => file.name !== name));
  };

  useEffect(() => {
    if (values.provinceId) {
      setFieldValue("cityId", "");
      setFieldValue("sectorId", "");
      setFieldValue("subSectorId", "");
      refetchCities();
    }
  }, [refetchCities, values.provinceId]);

  useEffect(() => {
    if (values.cityId) {
      setFieldValue("sectorId", "");
      setFieldValue("subSectorId", "");
      refetchSectors();
    }
  }, [refetchSectors, values.cityId]);

  useEffect(() => {
    if (values.sectorId) {
      setFieldValue("subSectorId", "");
      refetchSubSectors();
    }
  }, [refetchSubSectors, values.sectorId]);

  return (
    <>
      <Stack className="flex flex-col items-center gap-3">
        <CustomFormControl
          label={t("common.street")}
          name="street"
          value={values.street}
          onChange={handleChange}
          onBlur={handleBlur}
          error={!!errors.street}
          touched={touched.street}
          required
        />
        <CustomSelect
          name="provinceId"
          label={t("common.province")}
          onBlur={handleBlur}
          onChange={handleChange}
        >
          {!provinces ? (
            <CustomMenuItem key={0} value={0}>
              {t("common.loading.provinces")}
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
          label={t("common.city")}
          onBlur={handleBlur}
          onChange={handleChange}
        >
          {!cities ? (
            <CustomMenuItem key={0} value={0}>
              {t("common.loading.cities")}
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
          label={t("addAddressForm.fields.sector")}
          onBlur={handleBlur}
          onChange={handleChange}
        >
          {!sectors ? (
            <CustomMenuItem key={0} value={0}>
              {t("common.loading.sectors")}
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
          label={t("common.subSector")}
          onBlur={handleBlur}
          onChange={handleChange}
        >
          {!subSectors ? (
            <CustomMenuItem key={0} value={0}>
              {t("common.loading.subSectors")}
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

        <StyledFormControl
          onBlur={handleBlur}
          variant="outlined"
          required
          error={touched.documentCode && Boolean(errors.documentCode)}
        >
          <StyledInputLabel id="documentCode" htmlFor="documentCode" required>
            {t("common.documentCode")}
          </StyledInputLabel>
          <StyledOutlinedInput
            label={t("common.documentCode")}
            name="documentCode"
            value={values.documentCode}
            onChange={handleChange}
            placeholder={true ? "000-000000-0" : "RD9999999"}
            required
            inputComponent={IDMask as any}
            error={touched.documentCode && Boolean(errors.documentCode)}
          />
          <FormHelperText className="text-error-dark">
            {touched.documentCode ? errors.documentCode : null}
          </FormHelperText>
        </StyledFormControl>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <Typography variant="body2" className="text-primary-dark">
            {t("providerSignUp.upload.title")}
          </Typography>
          <FileSelector
            pictures={pictures}
            setPictures={setPictures}
            setUpload={setHasPictures}
          />
          {hasPictures &&
            pictures.map((file) => {
              return (
                <FileUpload
                  key={file.name}
                  onDelete={handleOnDelete}
                  file={file}
                />
              );
            })}
        </div>

        <FormControl className="w-[320px]">
          <FormLabel htmlFor="RegisteredInDGII">
            <Typography
              variant="subtitle1"
              className="text-primary-dark"
              align={"left"}
            >
              {t("common.isRegisteredInDgii")}
            </Typography>
          </FormLabel>

          <RadioGroup
            name="isRegisteredInDGII"
            value={isVisible}
            onChange={({ target: { value } }) => {
              setIsVisible(value === "true");
            }}
            className="px-2.5"
          >
            <FormControlLabel
              value={true}
              control={<StyledRadio />}
              label={t("providerRegistration.isRegisteredInDGII.yes")}
            />

            <FormControlLabel
              value={false}
              control={<StyledRadio />}
              label={t("providerRegistration.isRegisteredInDGII.no")}
            />
          </RadioGroup>
          {isVisible && (
            <CustomFormControl
              label={t("common.rncOrDgiiCode")}
              name="rncOrDgiiCode"
              value={values.rncOrDgiiCode ?? ""}
              onChange={handleChange}
              onBlur={handleBlur}
              error={!!errors.rncOrDgiiCode}
              touched={touched.rncOrDgiiCode}
            />
          )}
        </FormControl>
      </Stack>
    </>
  );
};
