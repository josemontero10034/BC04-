import {
  Call,
  CheckCircle,
  Circle,
  Dialpad,
  LocationOn,
  Message,
} from "@mui/icons-material";
import { Avatar, Box, Dialog, IconButton, Typography } from "@mui/material";
import { OrderStatus } from "@prisma/client";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

import { trpc } from "@/utils/trpc";

import useToggle from "../../hooks/useToggle";
import { StyledButton } from "../shared/styled-components";
import {
  ClientIdentityVerification,
  ProviderIdentityVerification,
} from "./order-identity-verification";

interface ProviderUserInfoProps {
  providerName: string;
  providerUserImage: string;
  id: string;
  status: OrderStatus | null;
  isVerified: boolean;
}

interface ClientUserInfoProps {
  clientName: string;
  clientUserImage: string;
  orderAddress: string;
  isVerified: boolean;
  id: string;
}

export const ProviderUserInfo = ({
  providerUserImage,
  providerName,
  id,
  status,
  isVerified,
}: ProviderUserInfoProps) => {
  const t = useTranslations();
  const {
    status: openVerificationDialog,
    statusToggler: toggleOpenVerificationDialog,
  } = useToggle();

  const { data: verification } = trpc.pin.getVerificationCode.useQuery({
    orderId: id,
  });

  return (
    <>
      <Box className="relative flex w-full flex-row items-center gap-2 bg-inherit">
        <Avatar
          alt={`${providerUserImage}`}
          src={providerUserImage}
          sx={{ width: 80, height: 80 }}
        />
        <Box className="flex w-full flex-col  gap-2">
          <Typography variant="body1" className="text-common-black">
            {providerName}
          </Typography>
          <Box
            className={`gap-0.25 flex w-full flex-row items-center ${
              !verification?.Order?.isVerified ? "gap-3" : "gap-2"
            }`}
          >
            {!isVerified ? (
              <>
                <ClientIdentityVerification
                  isOpen={openVerificationDialog}
                  setIsOpen={toggleOpenVerificationDialog}
                  code={verification?.pin ?? "0000"}
                  orderStatus={status ?? "ASSIGNED"}
                />
                <StyledButton
                  variant="outlined"
                  className="m-0 h-8 w-24 gap-x-1.5 border border-[#0D3A93] bg-secondary-blue text-sm text-[#0D3A93] shadow-none hover:bg-secondary-blue focus:bg-secondary-blue"
                  onClick={toggleOpenVerificationDialog}
                >
                  <Dialpad className="text-base" />
                  {verification?.pin ?? 0}
                </StyledButton>
              </>
            ) : (
              <>
                <Typography className="text-sm">
                  {t("identityVerified.label")}
                </Typography>
                <CheckCircle className="h-5 w-5 fill-[#049500]" />
                <Circle className="h-2 w-2 fill-primary-main" />
              </>
            )}
            <IconButton
              className={
                "h-7 w-7 border-2 border-solid border-primary-dark bg-white text-primary-dark"
              }
            >
              <Message className="h-4 w-4" />
            </IconButton>

            <IconButton
              className={
                "h-7 w-7 border-2 border-solid border-primary-dark bg-white text-primary-dark"
              }
            >
              <Call className="h-4 w-4" />
            </IconButton>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export const ClientUserInfo = ({
  clientName,
  clientUserImage,
  orderAddress,
  id,
  isVerified: providerVerified,
}: ClientUserInfoProps) => {
  const t = useTranslations();
  const {
    status: openVerificationDialog,
    statusToggler: toggleOpenVerificationDialog,
  } = useToggle();

  // is provider verified ? ===> this is a query or a prop?
  const [isProviderVerified, setIsProviderVerified] = useState<boolean>(false);

  useEffect(() => {
    setIsProviderVerified(providerVerified);
  }, [providerVerified]);

  return (
    <>
      <Box className="relative flex w-full flex-row items-center gap-2 bg-inherit">
        <Avatar
          alt={`${t("orderDetail.orderUserInfo.avatarAlt")} ${clientName}`}
          title={`${t("orderDetail.orderUserInfo.avatarAlt")} ${clientName}`}
          src={clientUserImage}
          sx={{ width: 80, height: 80 }}
        />
        <Box className="flex w-full flex-col items-start gap-2">
          <Typography variant="body1" className="text-common-black">
            {clientName}
          </Typography>

          <Box className="w-full h-5 flex flex-row items-center justify-start gap-2 ">
            <LocationOn className="h-5 w-5 fill-primary-main" />
            <Typography variant="body1" className="text-common-black">
              {orderAddress ?? "C. Prueba de orden, #0"}
            </Typography>
          </Box>
          <Box className={`gap-0.25 flex w-full flex-row items-center gap-2`}>
            {!isProviderVerified ? (
              <>
                <ProviderIdentityVerification
                  isOpen={openVerificationDialog}
                  onClose={toggleOpenVerificationDialog}
                  orderId={id}
                />
                <StyledButton
                  variant="outlined"
                  className="m-0 h-9 w-36 gap-x-1.5 bg-primary-dark text-white bordertext-sm shadow-none hover:text-primary-dark focus:text-primary-dark hover:bg-secondary-blue focus:bg-secondary-blue"
                  onClick={toggleOpenVerificationDialog}
                >
                  {t("verifyIdentityProvider.buttons.openDialog")}
                </StyledButton>
              </>
            ) : (
              <>
                <Typography className="text-sm">
                  {t("identityVerified.label")}
                </Typography>
                <CheckCircle className="h-5 w-5 fill-[#049500]" />
                <Circle className="h-2 w-2 fill-primary-main" />
              </>
            )}
            <IconButton
              className={
                "h-7 w-7 border-2 border-solid border-primary-dark bg-white text-primary-dark"
              }
            >
              <Message className="h-4 w-4" />
            </IconButton>

            <IconButton
              className={
                "h-7 w-7 border-2 border-solid border-primary-dark bg-white text-primary-dark"
              }
            >
              <Call className="h-4 w-4" />
            </IconButton>
          </Box>
        </Box>
      </Box>
    </>
  );
};
