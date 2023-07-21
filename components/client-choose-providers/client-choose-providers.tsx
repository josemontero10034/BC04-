import MOCK_PROVIDERS from "@/mock/mock-providers";
import { Container, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import router from "next/router";

import ROUTES from "@/utils/routes";
import { getCommonWhite } from "@/utils/theme";

import { StyledButton } from "../shared/styled-components";
import TopBar from "../top-bar";
import ProviderProfile from "./provider-profiles";

const ChooseProviders = () => {
  const t = useTranslations("chooseProviders");

  const handleOnClick = () => {
    router.push(ROUTES.landing);
  };

  return (
    <>
      <TopBar
        leftIcon="backArrow"
        pageTitle={t("providerOffers")}
        onLeftIconClick={handleOnClick}
      />
      <Container className="mt-11">
        {MOCK_PROVIDERS.length === 0 ? (
          <Typography className="break-words text-center w-[340px] px-2.5 mt-[45vh]">
            {t("clientActionCall")}
          </Typography>
        ) : (
          MOCK_PROVIDERS.map((profile) => {
            return <ProviderProfile key={profile.id} {...profile} />;
          })
        )}
      </Container>
      <Container className="mt-20">
        <StyledButton
          className="sticky bottom-0 mb-4 bg-primary-dark focus:bg-primary-dark w-[322px] h-[46px] justify-center"
          variant="contained"
        >
          <Typography variant="h4" color={getCommonWhite}>
            {t("cancelNewOrder")}
          </Typography>
        </StyledButton>
      </Container>
    </>
  );
};

export default ChooseProviders;
