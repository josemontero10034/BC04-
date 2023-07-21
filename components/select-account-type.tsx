import PeopleIcon from "@mui/icons-material/People";
import PersonIcon from "@mui/icons-material/Person";
import { Container, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useRouter } from "next/router";

import ROUTES from "@/utils/routes";
import { getCommonWhite, getPrimaryDark } from "@/utils/theme";

import { StyledButton } from "./shared/styled-components";

const SelectAccountType = () => {
  const router = useRouter();
  const t = useTranslations("selectAccountType");

  return (
    <Container className="flex items-center flex-col pt-20">
      <Typography variant="h1" color={getPrimaryDark}>
        {t("title")}
      </Typography>
      <Image
        src={`/select-account-type-image-1.svg`}
        alt="image account type"
        width={320}
        height={320}
      />
      <Typography
        variant="h4"
        className="text-center text-common-black leading-5 w-[300px]"
      >
        {t.rich("choiceOption")}
      </Typography>
      <div className="flex flex-col space-y-4 w-full mt-4 items-center">
        <StyledButton
          className="bg-primary-dark focus:bg-primary-dark w-[290px]"
          variant="contained"
          type="button"
          onClick={() => router.push(ROUTES.clientSignUp)}
        >
          <PersonIcon className="mr-4" />
          <Typography variant="h4" color={getCommonWhite}>
            {t("clientButton")}
          </Typography>
        </StyledButton>
        <StyledButton
          className="bg-white border-2 border-primary-dark w-[290px]"
          variant="outlined"
          onClick={() => router.push(ROUTES.providerSignUp)}
        >
          <PeopleIcon className="mr-4 fill-primary-dark" />
          <Typography variant="h4" color={getPrimaryDark}>
            {t("providerButton")}
          </Typography>
        </StyledButton>
      </div>
    </Container>
  );
};

export default SelectAccountType;
