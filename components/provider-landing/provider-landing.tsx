import { Container } from "@mui/material";
import { useTranslations } from "next-intl";
import React from "react";

import { trpc } from "@/utils/trpc";

import useToggle from "../../hooks/useToggle";
import ProviderOrderList from "../orders/provider/provider-orders-list";
import TopBar from "../top-bar";
import ProviderSideMenu from "./provider-side-menu";
import ProviderVerificationDialog from "./provider-verification-dialog";

const ProviderLanding: React.FC = () => {
  const t = useTranslations();
  const { data: user } = trpc.auth.getLoggedUser.useQuery();
  const { status: isSideMenuOpen, statusToggler: toggleSideMenu } = useToggle();

  const handleFilterClick = () => {
    console.log("Filter icon clicked");
  };

  return (
    <>
      {!user?.termsOfService && <ProviderVerificationDialog />}
      <ProviderSideMenu isOpen={isSideMenuOpen} onToggle={toggleSideMenu} />
      <TopBar
        leftIcon="menu"
        rightIcon="notification"
        onLeftIconClick={toggleSideMenu}
        onRightIconClick={handleFilterClick}
        pageTitle={`${t("common.welcomeUser")}${user?.firstName}${t(
          "common.exclamationEnd"
        )}`}
      />
      <Container
        disableGutters
        className="flex flex-col gap-4 absolute top-11 p-0 m-0 py-4 w-full"
      >
        <ProviderOrderList />
      </Container>
    </>
  );
};

export default ProviderLanding;
