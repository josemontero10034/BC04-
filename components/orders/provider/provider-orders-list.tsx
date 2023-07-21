import { Container, List, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import React from "react";

import { trpc } from "@/utils/trpc";

import OrderStatusStyles from "../orders-status-styles";
import ProviderOrderCard from "./provider-order-card";

const ProviderOrderList = () => {
  const t = useTranslations();
  const { data: providertOrderList } = trpc.order.getProviderOrders.useQuery();

  return (
    <Container className="p-0 pt-1 w-max -mt-4 m-auto">
      {providertOrderList?.length === 0 ? (
        <>
          <Typography className="break-words max-w text-center w-[340px] px-2.5 mt-[45vh]">
            {t("providerLanding.workCoordination")}
          </Typography>
        </>
      ) : (
        <>
          <Typography
            component="label"
            htmlFor="active-orders-list"
            className="mx-4 text-common-black"
          >
            {t("common.activeOrder")}
          </Typography>
          <List
            id="active-orders-list"
            className="mx-4 flex flex-col gap-4 mt-2"
          >
            {providertOrderList?.map((order) => {
              const style = OrderStatusStyles(order.status ?? undefined);
              return (
                <div key={order.id.toString()}>
                  <ProviderOrderCard order={order} style={style} />
                </div>
              );
            })}
          </List>
        </>
      )}
    </Container>
  );
};

export default ProviderOrderList;
