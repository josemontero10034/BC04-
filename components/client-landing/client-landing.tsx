import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import PinDropIcon from "@mui/icons-material/PinDrop";
import {
  Container as Box,
  Container,
  ImageList,
  ImageListItem,
} from "@mui/material";
import Typography from "@mui/material/Typography";
import { Address } from "@prisma/client";
import { useTranslations } from "next-intl";
import { useRouter } from "next/router";
import { useCallback } from "react";

import ROUTES from "@/utils/routes";
import { trpc } from "@/utils/trpc";

import useToggle from "../../hooks/useToggle";
import ClientOrderList from "../orders/client/client-orders-list";
import { StyledButton } from "../shared/styled-components";
import TopBar from "../top-bar";
import ClientSideMenu from "./client-side-menu";

const ClientLanding = () => {
  const t = useTranslations();
  const { status: isSideMenuOpen, statusToggler: toggleSideMenu } = useToggle();
  const { data: user } = trpc.auth.getLoggedUser.useQuery();
  const router = useRouter();
  const { createOrder } = ROUTES;

  const serviceTypeImages = [
    {
      img: "assets/images/client-landing-image-2.svg",
      title: "Plomería",
    },
    {
      img: "assets/images/client-landing-image-3.svg",
      title: "Carpintería",
    },
    {
      img: "assets/images/client-landing-image-4.svg",
      title: "Ebanistería",
    },
    {
      img: "assets/images/client-landing-image-5.svg",
      title: "Mecánica",
    },
  ];

  const handleNotificationClick = () => {
    console.log("Filter icon clicked");
  };

  const handleCreateOrderClick = useCallback(async () => {
    return await router.push(createOrder);
  }, [router, createOrder]);

  return (
    <>
      <ClientSideMenu isOpen={isSideMenuOpen} onToggle={toggleSideMenu} />
      <TopBar
        leftIcon="menu"
        rightIcon="notification"
        onLeftIconClick={toggleSideMenu}
        onRightIconClick={handleNotificationClick}
        pageTitle={`${t("common.welcomeUser")}${user?.firstName}${t(
          "common.exclamationEnd"
        )}`}
      />
      <Container
        disableGutters
        className="flex flex-col gap-4 absolute top-11 p-0 m-0 py-4 w-full overflow-y-auto"
        sx={{
          height: `calc(100vh - ${
            user?.client?.orders.length !== 0 ? "130px" : "50px"
          })`,
        }}
      >
        <ClientAddressButton userAddresses={user?.client?.addresses} />
        <Box className="m-0 p-1 w-full">
          <Box className="flex flex-row justify-between">
            <Typography variant="h3" className="whitespace-nowrap">
              {t("clientLanding.categoryService")}
            </Typography>
            <Typography
              variant="h5"
              className="text-primary-dark underline underline-offset-1"
            >
              {t("clientLanding.seeAll")}
            </Typography>
          </Box>
          <ImageList
            className="ml-4 mt-4"
            sx={{
              height: 110,
              gridAutoFlow: "column",
              gridTemplateColumns:
                "repeat(auto-fill,minmax(160px,1fr)) !important",
              gridAutoColumns: "minmax(160px, 1fr)",
            }}
            cols={3}
            rowHeight={72}
          >
            {serviceTypeImages.map((item) => (
              <ImageListItem key={item.img}>
                <img
                  src={`${item.img}?&fit=crop&auto=format`}
                  srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                  loading="lazy"
                  alt={item.title}
                />
              </ImageListItem>
            ))}
          </ImageList>
        </Box>
        <Container
          disableGutters
          className="flex flex-col justify-center items-center test"
        >
          <ClientOrderList />
        </Container>
      </Container>
      {user?.client?.orders.length !== 0 && (
        <Box className="w-full h-20 flex flex-col justify-center items-center gap-4 bg-common-white border-t border-lighter-primary-main fixed bottom-0">
          <StyledButton
            className="bg-primary-dark focus:bg-primary-dark w-72 justify-center m-0"
            variant="contained"
            type="button"
            onClick={handleCreateOrderClick}
          >
            <Typography variant="h4" className="text-common-white">
              {t("clientLanding.createNewOrder")}
            </Typography>
          </StyledButton>
        </Box>
      )}
    </>
  );
};

export default ClientLanding;

const ClientAddressButton = ({
  userAddresses,
}: {
  userAddresses?: Address[];
}) => {
  const t = useTranslations("clientLanding");
  const router = useRouter();
  const { addressViewDelete, addAddress } = ROUTES;
  const handleSelfClick = useCallback(() => {
    router.push(
      !userAddresses || userAddresses.length < 1
        ? addAddress
        : addressViewDelete
    );
  }, [router, userAddresses, addAddress, addressViewDelete]);

  const mainAddress = userAddresses?.find((address) => address.isMainAddress);

  return (
    <Box
      className="flex flex-row items-center justify-between p-4 rounded-lg shadow-lg h-[75px] w-80 bg-primary-light bg-no-repeat bg-left bg-cover "
      sx={{
        backgroundImage: "url(/assets/images/client-landing-image-1.svg)",
      }}
      onClick={handleSelfClick}
    >
      {!userAddresses || userAddresses.length < 1 ? (
        <>
          <PinDropIcon className="fill-primary-main" />
          <Box>
            <Typography variant="body2">{t("noAddressRegistered")}</Typography>
            <Typography variant="body1">{t("createAddress")}</Typography>
          </Box>
          <ArrowForwardIosIcon className="fill-primary-dark" />
        </>
      ) : (
        <>
          <PinDropIcon className="  fill-primary-main" />
          <Box>
            <Typography variant="body2">{t("mainAddress")}</Typography>
            <Typography variant="body1">
              {!mainAddress
                ? `${userAddresses[0]?.street}, #${userAddresses[0]?.number}`
                : `${mainAddress?.street}, #${mainAddress?.number}`}
            </Typography>
          </Box>
          <ArrowForwardIosIcon className="fill-primary-dark" />
        </>
      )}
    </Box>
  );
};
