import { DataUsage } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import { UserRole } from "@prisma/client";
import { useTranslations } from "next-intl";

import { ClientUserInfo, ProviderUserInfo } from "./order-user-info";
import {
  OrderDescriptionProps,
  OrderTitleProps,
  OrderUserInfoProps,
} from "./type";

const { CLIENT, PROVIDER } = UserRole;

export const OrderTitle = (orderTitleProps: OrderTitleProps) => {
  const t = useTranslations();

  return (
    <Box className="flex w-full flex-col gap-5">
      <Box className="flex w-full flex-col items-center gap-2 text-common-black">
        <Typography fontSize="16px" fontWeight="600">
          {t("orderDetail.serviceTitle")}
          <span className="text-primary-main">
            {orderTitleProps.serviceTypeName}
          </span>
        </Typography>
        <Typography fontSize="13px" fontWeight="400">
          {orderTitleProps.subServiceTypeName}
        </Typography>
      </Box>
    </Box>
  );
};

export const OrderDescription = ({ description }: OrderDescriptionProps) => {
  const t = useTranslations();

  return (
    <Box className="flex w-full flex-col gap-5">
      <Box
        className={"flex w-full flex-col items-start gap-2 text-common-black"}
      >
        <Typography fontSize={"14px"} fontWeight="400">
          {t("orderDetail.description")}
        </Typography>
        <Typography fontSize={"13px"} fontWeight="500">
          {description}
        </Typography>
      </Box>
    </Box>
  );
};

export const OrderUserInfo = ({
  role,
  client,
  provider,
  orderAddress,
  isVerified,
  orderId,
  orderStatus,
}: OrderUserInfoProps) => {
  const t = useTranslations();

  return (
    <Box className="flex w-full flex-col gap-5">
      <Box className="flex w-full flex-col items-start gap-2 text-common-black">
        {role === CLIENT && (
          <>
            <Typography fontSize={"14px"} fontWeight="400">
              {t("orderDetail.provider")}
            </Typography>
            <Typography fontSize={"13px"} fontWeight="500">
              {!provider ? (
                <Box className="flex flex-row items-start gap-2">
                  <DataUsage
                    sx={{
                      color: "#FFA726",
                      transform: "rotate(360deg)",
                      height: "16px",
                      width: "16px",
                      marginY: "0.75px",
                    }}
                  />
                  <Typography fontSize={"13px"} fontWeight="500">
                    {t("orderDetail.searchingProvider")}
                  </Typography>
                </Box>
              ) : (
                <ProviderUserInfo
                  providerName={`${provider.firstName} ${provider.lastName}`}
                  providerUserImage={provider.image!}
                  id={orderId}
                  status={orderStatus}
                  isVerified={isVerified}
                />
              )}
            </Typography>
          </>
        )}
        {role === PROVIDER && (
          <>
            <Typography fontSize={"14px"} fontWeight="400">
              {t("orderDetail.client")}
            </Typography>
            <Typography fontSize={"13px"} fontWeight="500">
              <ClientUserInfo
                orderAddress={orderAddress.street}
                clientName={`${client!.firstName!} ${client!.lastName!}`}
                clientUserImage={client!.image!}
                isVerified={isVerified}
                id={orderId}
              />
            </Typography>
          </>
        )}
      </Box>
    </Box>
  );
};
