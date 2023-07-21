import { Box, Container, List, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import { useRouter } from "next/router";
import React, { useCallback } from "react";

import { StyledButton } from "@/components/shared/styled-components";

import ROUTES from "@/utils/routes";
import { trpc } from "@/utils/trpc";

import OrderStatusStyles from "../orders-status-styles";
import ClientOrderCard from "./client-order-card";

const { createOrder } = ROUTES;

const ClientOrderList = () => {
  const t = useTranslations();
  const router = useRouter();
  const { data: clientOrderList, isLoading } =
    trpc.order.getClientOrders.useQuery();

  const handleCreateOrderClick = useCallback(() => {
    router.push(createOrder);
  }, [router]);

  if (isLoading) return <></>;

  return (
    <>
      {clientOrderList?.length !== 0 ? (
        <Container className="w-screen h-full flex flex-col justify-center items-center">
          <Typography
            variant="h3"
            component="label"
            htmlFor="active-orders-list"
            className="mx-4 text-common-black text-start w-full"
          >
            {t("common.activeOrder")}
          </Typography>
          <List
            id="active-orders-list"
            className="m-0 p-0 mx-4 flex flex-col gap-4 mt-2"
          >
            {clientOrderList?.map((order) => {
              const style = OrderStatusStyles(order.status ?? undefined);
              return (
                <div key={order.id.toString()}>
                  <ClientOrderCard order={order} style={style} />
                </div>
              );
            })}
          </List>
        </Container>
      ) : (
        <Box className="w-full p-4 flex flex-col justify-center items-center gap-4 py-[45%]">
          <Typography className="break-words text-center">
            {t("clientLanding.clientCallToAction")}
          </Typography>
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
export default ClientOrderList;
