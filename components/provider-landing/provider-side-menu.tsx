import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import HelpIcon from "@mui/icons-material/Help";
import HomeIcon from "@mui/icons-material/Home";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import MiscellaneousServicesIcon from "@mui/icons-material/MiscellaneousServices";
import PolicyIcon from "@mui/icons-material/Policy";
import { Button, ListItemAvatar } from "@mui/material";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import { signOut } from "next-auth/react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useRouter } from "next/router";
import * as React from "react";
import { useCallback } from "react";

import ROUTES from "@/utils/routes";
import { getPrimaryDark } from "@/utils/theme";

import { SideMenuProps } from "../shared/types";

const drawerWidth = "256px";

const StyledListItemText = styled(ListItemText)((props) => ({
  fontSize: props.theme.typography.body1.fontSize,
  fontWeight: props.theme.typography.body2.fontWeight,
  color: props.theme.palette.common.black,
}));

const ProviderSideMenu = ({
  isOpen,
  onToggle: handleToggle,
}: SideMenuProps) => {
  const t = useTranslations("sideMenu");
  const handleSignOut = useCallback(() => signOut(), []);
  const router = useRouter();

  return (
    <>
      <SwipeableDrawer
        onClick={handleToggle}
        open={isOpen}
        sx={{
          backgroundColor: "#FAFBFD",
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        <Box className="flex items-center absolute left-5 top-6">
          <Image src="/blue-pages-icon.png" alt="me" width="30" height="30" />
          <Typography
            variant="h2"
            color={getPrimaryDark}
            className="ml-2 uppercase"
          >
            Blue Pages
          </Typography>
        </Box>
        <List className="left-2 absolute top-[70px]">
          <ListItemButton>
            <ListItemIcon>
              <HomeIcon color="primary" />
            </ListItemIcon>
            <StyledListItemText>{t("home")}</StyledListItemText>
          </ListItemButton>

          <ListItemButton>
            <ListItemIcon>
              <AccountCircleIcon color="primary" />
            </ListItemIcon>
            <StyledListItemText>{t("account")}</StyledListItemText>
          </ListItemButton>

          <ListItemButton>
            <ListItemIcon>
              <MenuBookIcon color="primary" />
            </ListItemIcon>
            <StyledListItemText>{t("orders")}</StyledListItemText>
          </ListItemButton>

          <ListItemButton
            onClick={() => void router.push(ROUTES.providerAddServices)}
          >
            <ListItemIcon>
              <MiscellaneousServicesIcon color="primary" />
            </ListItemIcon>
            <StyledListItemText>{t("services")}</StyledListItemText>
          </ListItemButton>

          <ListItemButton
            onClick={() => void router.push(ROUTES.financeProvider)}
          >
            <ListItemIcon>
              <AttachMoneyIcon color="primary" />
            </ListItemIcon>
            <StyledListItemText>{t("finance")}</StyledListItemText>
          </ListItemButton>

          <ListItemButton onClick={() => void router.push(ROUTES.contact)}>
            <ListItemIcon>
              <HelpIcon color="primary" />
            </ListItemIcon>
            <StyledListItemText>{t("contact")}</StyledListItemText>
          </ListItemButton>

          <ListItemButton onClick={() => void router.push(ROUTES.aboutUs)}>
            <ListItemIcon>
              <PolicyIcon color="primary" />
            </ListItemIcon>
            <StyledListItemText>{t("aboutUs")}</StyledListItemText>
          </ListItemButton>
        </List>
        <List className="p-2 pl-0 absolute top-[416px]">
          <Button
            onClick={handleSignOut}
            className="text-error-dark normal-case flex flex-row space-x-4"
          >
            <ListItemAvatar>
              <LogoutIcon />
            </ListItemAvatar>
            <ListItemText>{t("logOut")}</ListItemText>
          </Button>
        </List>
      </SwipeableDrawer>
    </>
  );
};

export default ProviderSideMenu;
