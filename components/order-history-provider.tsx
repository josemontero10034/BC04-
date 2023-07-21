import { Box, List } from "@mui/material";
import { OrderStatus } from "@prisma/client";
import { useTranslations } from "next-intl";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Range } from "react-date-range";

import OrderStatusStyles from "@/components/orders/orders-status-styles";

import ROUTES from "@/utils/routes";
import { trpc } from "@/utils/trpc";

import ProviderOrderCard from "./orders/provider/provider-order-card";
import { FilterChip } from "./shared/custom-fields";
import DateRangeFilter from "./shared/date-range-filter/date-range-filter";
import { ProviderOrder } from "./shared/types";
import TopBar from "./top-bar";

interface Filters {
  active: boolean;
  completed: boolean;
}

const OrderHistoryProvider = () => {
  const t = useTranslations("orderHistory");
  const router = useRouter();
  const [filters, setFilters] = useState<Filters>({
    active: true,
    completed: false,
  });

  const [orders, setOrders] = useState<Array<ProviderOrder>>();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [dateRange, setDateRange] = useState<Range>({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });

  const { data: orderList } = trpc.order.getProviderOrders.useQuery();

  const { ASSIGNED, EVALUATING, IN_PROGRESS, COMPLETED } = OrderStatus;

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

  const handleBackClick = () => {
    router.push(ROUTES.landing);
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
        onLeftIconClick={handleBackClick}
      />

      <Box className="flex flex-col items-center w-screen pt-4 absolute top-11 bottom-0">
        <Box className="flex flex-row w-80 gap-x-2 pb-4 sticky">
          <FilterChip
            label={t("filters.active")}
            value="active"
            filters={filters}
            onClick={handleStatusFilterClick}
          />

          <FilterChip
            label={t("filters.completed")}
            value="completed"
            filters={filters}
            onClick={handleStatusFilterClick}
          />
        </Box>

        <List className="flex flex-col items-center h-[724px] w-full gap-y-4 pt-0 relative overflow-auto">
          {filters.active &&
            orders
              ?.filter(
                ({ status }) =>
                  status === ASSIGNED ||
                  status === EVALUATING ||
                  status === IN_PROGRESS
              )
              .map((order) => {
                if (order?.status) {
                  const style = OrderStatusStyles(order.status);
                  return (
                    <div key={order.id.toString()}>
                      <ProviderOrderCard order={order} style={style} />
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
                      <ProviderOrderCard order={order} style={style} />
                    </div>
                  );
                }
              })}
        </List>
      </Box>
    </>
  );
};

export default OrderHistoryProvider;
