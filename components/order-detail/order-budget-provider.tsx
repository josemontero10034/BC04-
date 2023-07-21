import { Box, Typography } from "@mui/material";
import { BudgetStatus, OrderBudget } from "@prisma/client";
import { useTranslations } from "next-intl";
import React, { useEffect, useState } from "react";

import { currencyFormat } from "@/utils/formats.utils";
import { trpc } from "@/utils/trpc";

import useToggle from "../../hooks/useToggle";
import { StyledButton } from "../shared/styled-components";
import { ProviderDialog } from "./order-budget-dialogs";
import { getBudgetTotal, iconByStatus } from "./order-utils";
import { OrderBudgetProviderProps } from "./type";

const OrderBudgetProvider = ({
  role,
  orderId,
  onToggleOpenForm: toggleOpenForm,
}: OrderBudgetProviderProps) => {
  // components togglers
  const { status: open, statusToggler: toggleOpen } = useToggle();

  // data states
  const [budget, setBudget] = useState<OrderBudget | undefined>();

  // constants and utils
  const t = useTranslations();
  const { REJECTED } = BudgetStatus;
  const totalAmount = getBudgetTotal(Number(budget?.amount ?? 0));

  // data fetchers
  const { data: fetchedBudget } = trpc.orderBudget.read.useQuery({
    orderId: String(orderId),
  });

  // data effects
  useEffect(() => {
    if (fetchedBudget) {
      const { status, amount, description } = fetchedBudget;

      // if the status changes, update the budget
      if (status !== budget?.status) {
        setBudget(fetchedBudget);
        if (status === REJECTED && !open) {
          toggleOpen();
        }
      }

      // if the amount or description changes, update the budget
      if (amount !== budget?.amount || description !== budget?.description) {
        setBudget(fetchedBudget);
      }
    }
  }, [fetchedBudget]);

  if (role !== "PROVIDER") {
    return <></>;
  }

  return (
    <Box className="flex w-full flex-col gap-5">
      <Box
        className={"flex w-full flex-col items-start gap-2 text-common-black"}
      >
        <Typography fontSize={"14px"} fontWeight="400">
          {t("orderDetail.budget")}
        </Typography>
        <Box className="flex w-full flex-row items-start gap-2">
          {!budget ? (
            <StyledButton
              sx={{ fontSize: "13.5px", fontWeight: "600" }}
              variant="contained"
              className="relative m-auto flex h-10 w-[319px] items-center rounded-[70px] bg-primary-dark capitalize  hover:bg-primary-dark focus:bg-primary-dark"
              onClick={toggleOpenForm}
            >
              {t("orderDetail.makeBudget")}
            </StyledButton>
          ) : (
            <>
              <ProviderDialog
                title={t("orderDetail.providerBudgetDialog.title")}
                content={t.rich("orderDetail.providerBudgetDialog.content")}
                open={open}
                onClose={toggleOpen}
              />
              <Box className="flex w-full flex-row justify-between">
                <Box className="flex flex-row gap-1">
                  <Typography fontSize="13px" fontWeight="500">
                    {`${t("common.currencyType.rd")} ${currencyFormat(
                      totalAmount.total
                    )}`}
                  </Typography>
                  {iconByStatus[budget?.status ?? "WARNING"]}
                </Box>
                <Typography
                  fontSize="12px"
                  fontWeight={500}
                  className="text-primary-dark underline"
                  onClick={toggleOpenForm}
                >
                  {t("orderDetail.providerBudgetDialog.budgetEdit")}
                </Typography>
              </Box>
            </>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default OrderBudgetProvider;
