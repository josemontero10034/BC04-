import { Box, List } from "@mui/material";
import { OrderStatus } from "@prisma/client";
import { useTranslations } from "next-intl";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Range } from "react-date-range";

import ClientOrderCard from "@/components/orders/client/client-order-card";
import OrderStatusStyles from "@/components/orders/orders-status-styles";
import { FilterChip } from "@/components/shared/custom-fields";
import DateRangeFilter from "@/components/shared/date-range-filter/date-range-filter";
import TopBar from "@/components/top-bar";

import ROUTES from "@/utils/routes";
import { trpc } from "@/utils/trpc";

import { ClientOrder } from "./shared/types";

interface Filters {
  active: boolean;
  completed: boolean;
  canceled: boolean;
}

const OrderHistoryClient = () => {
  const t = useTranslations("orderHistory");
  const router = useRouter();
  const [filters, setFilters] = useState<Filters>({
    active: true,
    completed: false,
    canceled: false,
  });

  const [orders, setOrders] = useState<Array<ClientOrder>>();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [dateRange, setDateRange] = useState<Range>({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });

  const { COMPLETED, CANCELED } = OrderStatus;

  const { data: orderList } = trpc.order.getClientOrders.useQuery();

  useEffect(() => {
    setOrders(orderList);
  }, [orderList]);

  const handleStatusFilterClick = (clickedFilter: keyof Filters) => {
    setFilters((prevState) => {
      return {
        ...prevState,
        [clickedFilter]: !prevState[clickedFilter],
      };
    });
  };

  const handleClickApply = () => {
    setOrders(filterOrdersbyDate(dateRange.startDate, dateRange.endDate));

    setIsOpen(false);
  };

  const handleClickClear = () => {
    setDateRange({
      ...dateRange,
      startDate: new Date(),
      endDate: new Date(),
    });
    setOrders(orderList);

    setIsOpen(false);
  };

  const filterOrdersbyDate = (
    startDate: Date | undefined,
    endDate: Date | undefined
  ) => {
    const filteredOrders = orderList?.filter((order) => {
      const orderDate = new Date(order.createdDate);

      return (
        orderDate >= (startDate ?? new Date()) &&
        orderDate <= (endDate ?? new Date())
      );
    });

    return filteredOrders ?? [];
  };

  return (
    <>
      <TopBar
        leftIcon="backArrow"
        rightIcon={
          <Box>
            <DateRangeFilter
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              selectionRange={dateRange}
              setSelectionRange={setDateRange}
              handleApplyFilter={handleClickApply}
              handleClearFilter={handleClickClear}
            />
          </Box>
        }
        pageTitle={t("title")}
        onLeftIconClick={() => router.push(ROUTES.landing)}
      />

      <Box className="flex flex-col items-center w-screen pt-4 absolute top-11 bottom-0">
        <Box className="flex flex-row gap-x-1.5 pb-4 sticky">
          <FilterChip
            label={t("filters.active")}
            isSmall
            value="active"
            filters={filters}
            onClick={handleStatusFilterClick}
          />

          <FilterChip
            label={t("filters.completed")}
            isSmall
            value="completed"
            filters={filters}
            onClick={handleStatusFilterClick}
          />

          <FilterChip
            label={t("filters.canceled")}
            isSmall
            value="canceled"
            filters={filters}
            onClick={handleStatusFilterClick}
          />
        </Box>

        <List className="flex flex-col items-center h-[724px] w-full gap-y-4 pt-0 relative overflow-auto">
          {filters.active &&
            orders
              ?.filter(
                ({ status }) => status !== COMPLETED && status !== CANCELED
              )
              .map((order) => {
                if (order?.status) {
                  const style = OrderStatusStyles(order.status);
                  return (
                    <div key={order.id.toString()}>
                      <ClientOrderCard order={order} style={style} />
                    </div>
                  );
                }
              })}

          {filters.completed &&
            orders
              ?.filter((order) => order.status === COMPLETED)
              .map((order) => {
                if (order?.status) {
                  const style = OrderStatusStyles(order.status);
                  return (
                    <div key={order.id.toString()}>
                      <ClientOrderCard order={order} style={style} />
                    </div>
                  );
                }
              })}

          {filters.canceled &&
            orders
              ?.filter((order) => order.status === CANCELED)
              .map((order) => {
                if (order?.status) {
                  const style = OrderStatusStyles(order.status);
                  return (
                    <div key={order.id.toString()}>
                      <ClientOrderCard order={order} style={style} />
                    </div>
                  );
                }
              })}
        </List>
      </Box>
    </>
  );
};

export default OrderHistoryClient;
