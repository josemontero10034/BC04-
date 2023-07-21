import { DataUsage, InfoRounded } from "@mui/icons-material";
import { Box, ClickAwayListener, Typography } from "@mui/material";
import { BudgetStatus, OfferStatus, OrderBudget } from "@prisma/client";
import { useTranslations } from "next-intl";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";

import { currencyFormat } from "@/utils/formats.utils";
import { trpc } from "@/utils/trpc";

import useToggle from "../../hooks/useToggle";
import { CustomWidthTooltip, StyledButton } from "../shared/styled-components";
import { ClientBudgetDialog } from "./order-budget-dialogs";
import { getBudgetTotal, iconByStatus } from "./order-utils";
import { OrderBudgetClientProps } from "./type";

interface BudgetInfoProps {
  budgetData: OrderBudget;
  onBudgetUpdate: Dispatch<SetStateAction<OrderBudget | null | undefined>>;
}

const BudgetPending = () => {
  const t = useTranslations();
  return (
    <>
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
        {t("orderDetail.budgetPending")}
      </Typography>
    </>
  );
};

const BudgetInfo = ({
  budgetData,
  onBudgetUpdate: updateBudgetData,
}: BudgetInfoProps) => {
  const t = useTranslations();
  const { status: dialogOpen, statusToggler: toggleDialogOpen } = useToggle();
  const { status: tooltipOpen, statusToggler: toggleTooltipOpen } = useToggle();
  const totalAmount = getBudgetTotal(Number(budgetData?.amount ?? 0));
  const { PENDING } = OfferStatus;

  const { mutateAsync, isSuccess, data } =
    trpc.orderBudget.updateStatus.useMutation();

  const handleDecision = useCallback(
    async (decision: BudgetStatus) => {
      await mutateAsync({
        id: budgetData.id,
        status: decision,
      });
    },
    [budgetData.id, mutateAsync]
  );

  useEffect(() => {
    if (isSuccess) {
      updateBudgetData(data);
    }
  }, [isSuccess]);

  if (budgetData?.status !== PENDING) {
    return (
      <>
        <Typography fontSize={"13px"} fontWeight="500">
          {`${t("common.currencyType.rd")} ${currencyFormat(
            totalAmount.total
          )}`}
        </Typography>
        {iconByStatus[budgetData?.status]}
      </>
    );
  }

  return (
    <>
      <ClientBudgetDialog
        amount={totalAmount.total}
        description={budgetData?.description ?? ""}
        open={dialogOpen}
        onClose={toggleDialogOpen}
        onBudgetDecision={handleDecision}
      />
      <StyledButton
        variant="outlined"
        className="mt-0 h-[38px] w-fit gap-x-2.5 border border-[#0D3A93] bg-secondary-blue text-sm text-[#0D3A93] shadow-none hover:bg-secondary-blue focus:bg-secondary-blue"
        onClick={toggleDialogOpen}
      >
        <Typography fontSize={"14px"} fontWeight="500">
          {`$ ${currencyFormat(totalAmount.total)}`}
        </Typography>
      </StyledButton>
      <ClickAwayListener onClickAway={toggleTooltipOpen}>
        <CustomWidthTooltip
          PopperProps={{
            disablePortal: true,
          }}
          onClose={toggleTooltipOpen}
          open={tooltipOpen}
          placement="right"
          title="Este es el presupuesto enviado por el proveedor, para aceptarlo o cancelarlo, haz click sobre el."
          color="primary"
          arrow
        >
          <InfoRounded
            onClick={toggleTooltipOpen}
            className="h-5 w-5 text-primary-dark"
          />
        </CustomWidthTooltip>
      </ClickAwayListener>
    </>
  );
};

const OrderBudgetClient = ({ role, orderId }: OrderBudgetClientProps) => {
  // style states
  const [budget, setBudget] = useState<OrderBudget | null>();

  // constants and utils
  const t = useTranslations();
  const TIME_INTERVAL = 10000;
  // data fetchers
  const { data: fetchedBudget } = trpc.orderBudget.read.useQuery(
    {
      orderId: String(orderId),
    },
    { refetchInterval: TIME_INTERVAL }
  );

  // effects
  useEffect(() => {
    if (fetchedBudget) {
      setBudget(fetchedBudget);
    }
  }, [fetchedBudget]);

  if (role !== "CLIENT") {
    return <></>;
  }

  return (
    <>
      <Box className="flex w-full flex-col gap-5">
        <Box
          className={"flex w-full flex-col items-start gap-2 text-common-black"}
        >
          <Typography fontSize={"14px"} fontWeight="400">
            {t("orderDetail.budget")}
          </Typography>
          <Box className="flex w-full flex-row items-center justify-start gap-2">
            {!budget ? (
              <BudgetPending />
            ) : (
              <BudgetInfo budgetData={budget} onBudgetUpdate={setBudget} />
            )}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default OrderBudgetClient;
