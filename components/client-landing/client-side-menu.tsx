import CreditCardIcon from "@mui/icons-material/CreditCard";
import FmdGoodIcon from "@mui/icons-material/FmdGood";
import HelpIcon from "@mui/icons-material/Help";
import HomeIcon from "@mui/icons-material/Home";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import PolicyIcon from "@mui/icons-material/Policy";
import {
  Button,
  ListItemAvatar,
  ListItemButton,
  ListItemIcon,
} from "@mui/material";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import { signOut } from "next-auth/react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import router from "next/router";
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

const ClientSideMenu = ({ isOpen, onToggle: handleToggle }: SideMenuProps) => {
  const t = useTranslations();
  const handleSignOut = useCallback(() => signOut(), []);

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
            <StyledListItemText>{t("sideMenu.home")}</StyledListItemText>
          </ListItemButton>
          <ListItemButton>
            <ListItemIcon>
              <FmdGoodIcon color="primary" />
            </ListItemIcon>
            <StyledListItemText>{t("sideMenu.address")}</StyledListItemText>
          </ListItemButton>
          <ListItemButton>
            <ListItemIcon>
              <MenuBookIcon color="primary" />
            </ListItemIcon>
            <StyledListItemText>{t("sideMenu.orders")}</StyledListItemText>
          </ListItemButton>

          <ListItemButton>
            <ListItemIcon>
              <CreditCardIcon color="primary" />
            </ListItemIcon>
            <StyledListItemText>{t("sideMenu.card")}</StyledListItemText>
          </ListItemButton>

          <ListItemButton onClick={() => void router.push(ROUTES.contact)}>
            <ListItemIcon>
              <HelpIcon color="primary" />
            </ListItemIcon>
            <StyledListItemText>{t("sideMenu.contact")}</StyledListItemText>
          </ListItemButton>

          <ListItemButton onClick={() => void router.push(ROUTES.aboutUs)}>
            <ListItemIcon>
              <PolicyIcon color="primary" />
            </ListItemIcon>
            <StyledListItemText>{t("sideMenu.aboutUs")}</StyledListItemText>
          </ListItemButton>
        </List>
        <List className="p-2 pl-0 absolute top-[371px]">
          <Button
            onClick={handleSignOut}
            className="text-error-dark normal-case flex flex-row space-x-4"
          >
            <ListItemAvatar>
              <LogoutIcon />
            </ListItemAvatar>
            <ListItemText>{t("sideMenu.logOut")}</ListItemText>
          </Button>
        </List>
      </SwipeableDrawer>
    </>
  );
};

export default ClientSideMenu;
