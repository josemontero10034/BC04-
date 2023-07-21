import CopyrightIcon from "@mui/icons-material/Copyright";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import { Box, Container, Divider, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import Image from "next/image";
import router from "next/router";

import ROUTES from "@/utils/routes";
import { getCommonBlack, getPrimaryDark } from "@/utils/theme";

import TopBar from "./top-bar";

const AboutUs = () => {
  const t = useTranslations("aboutUs");
  const handleOnClick = () => {
    void router.push(ROUTES.landing);
  };

  return (
    <>
      <TopBar
        leftIcon="backArrow"
        pageTitle={t("aboutUsTitle")}
        onLeftIconClick={handleOnClick}
      />
      <Container className="mt-4 text-center">
        <Image
          src={`/blue-pages-icon.png`}
          alt="image account type"
          width={90}
          height={90}
        />
        <Typography
          color={getPrimaryDark}
          className="text-2xl uppercase font-semibold"
        >
          Blue Pages
        </Typography>
      </Container>
      <Container className="mt-6">
        <Typography className="text-[15px] font-normal">
          {t.rich("aboutUsText1")}
        </Typography>
      </Container>
      <Container className="mt-4">
        <Typography className="text-[15px] font-normal">
          {t("aboutUsText2")}
        </Typography>
      </Container>
      <Container className="mt-6 text-center">
        <Image
          src={`/assets/images/about-us-1.png`}
          alt="image account type"
          width={274}
          height={274}
        />
      </Container>
      <Container className="mt-4 text-center">
        <Typography variant="h3" className="text-primary-dark">
          {t("mision")}
        </Typography>
        <Typography className="text-[15px] mt-3 font-normal">
          {t("misionText")}
        </Typography>
      </Container>
      <Container className="mt-4 flex flex-row justify-center">
        <Divider className="w-[117px] border rounded-lg bg-secondary-main" />
      </Container>
      <Container className="mt-4 text-center">
        <Typography variant="h3" className="text-primary-dark">
          {t("vision")}
        </Typography>
        <Typography className="text-[15px] mt-3 font-normal">
          {t("visionText")}
        </Typography>
      </Container>
      <Container className="mt-4 flex flex-row justify-center">
        <Divider className="w-[117px] border rounded-lg bg-secondary-main" />
      </Container>
      <Container className="mt-4 text-center">
        <Typography variant="h3" className="text-primary-dark">
          {t("values")}
        </Typography>
        <Typography className="text-[15px] mt-3 mb-8 font-normal">
          {t("valuesText")}
        </Typography>
      </Container>
      <div className="border-secondary-blue divide-y border-y mt-4">
        <Box>
          <Container className="flex flex-row items-center mt-4">
            <Image
              src={`/blue-pages-icon.png`}
              alt="image account type"
              width={24}
              height={24}
            />
            <Typography
              variant="h3"
              color={getPrimaryDark}
              className="uppercase mt-1 ml-3"
            >
              Blue Pages
            </Typography>
          </Container>
          <Container className="flex flex-row items-center mt-[25px]">
            <LocationOnIcon className="fill-primary-main w-5 h-5" />
            <Typography className="font-normal ml-3">
              {t("aboutUsAddress")}
            </Typography>
          </Container>
          <Container className="flex flex-row items-center mt-4">
            <PhoneIcon className="fill-primary-main w-5 h-5" />
            <Typography className="font-normal ml-3">
              {t("aboutUsPhone")}
            </Typography>
          </Container>

          <Container className="flex flex-row items-center mt-4 mb-4">
            <EmailIcon className="fill-primary-main w-5 h-5" />
            <Typography className="font-normal ml-3">
              {t("aboutUsEmail")}
            </Typography>
          </Container>
        </Box>
      </div>
      <Container className="flex flex-row items-center pl-[56px] mt-4 pb-10">
        <CopyrightIcon className="w-[15px] h-[15px] fill-primary-dark" />
        <Typography variant="body2" color={getCommonBlack} className="ml-3">
          {t("rights")}
        </Typography>
      </Container>
    </>
  );
};
export default AboutUs;
