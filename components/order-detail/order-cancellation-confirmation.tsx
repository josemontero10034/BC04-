import { Typography } from "@mui/material";
import { OfferStatus, OrderStatus, UserRole } from "@prisma/client";
import { useTranslations } from "next-intl";

import { currencyFormat } from "@/utils/formats.utils";

import { StyledButton } from "../shared/styled-components";
import { getBudgetTotal, getFare } from "./order-utils";
import { CancellationConfirmationProps, OrderCancellationStatus } from "./type";

const OrderCancellationConfirmation = ({
  selectedReason,
  order,
  cancellationStatus,
  onOpen: handleCancelOrder,
  onClose: handleClick,
  userRole,
}: CancellationConfirmationProps) => {
  const t = useTranslations("orderDetail.cancellation");
  const { EVALUATING } = OrderStatus;
  const { PENDING, REJECTED } = OfferStatus;

  const getFareByStatus = (status: OrderCancellationStatus) => {
    const serviceType = order.serviceType?.name;
    const providerName = order.provider?.user.firstName;
    const budgetTotal = getBudgetTotal(Number(order.budget?.amount)).total;
    const { CLIENT, PROVIDER } = UserRole;

    if (status === EVALUATING || status === REJECTED || status === PENDING) {
      return (
        <>
          <Typography variant="h6" className="mb-4">
            {t("aboutToCancelOrder")}
            <span className="font-semibold">{serviceType}</span>.
            {userRole === CLIENT && t("client.standardFare")}
            {userRole === PROVIDER && t("provider.standardFare")}
            <span className="font-semibold">{"RD$ 150.00"}</span>
            {userRole === CLIENT && (
              <>
                {t("client.providerRemuneration")}
                <span className="font-semibold">{providerName}</span>?
              </>
            )}
            {userRole === PROVIDER && t("provider.evaluationRemuneration")}
          </Typography>
          {userRole === CLIENT && (
            <Typography variant="h6" className="mb-4">
              {t("client.fareBreakdown")}
              {providerName}.
            </Typography>
          )}
        </>
      );
    } else if (status === "ACCEPTED") {
      return (
        <>
          <Typography variant="h6" className="mb-4">
            {t("aboutToCancelOrder")}
            <span className="font-semibold">{serviceType}</span>.
            {userRole === CLIENT && t("client.dynamicFare")}
            {userRole === PROVIDER && t("provider.dynamicFare")}
            <span className="font-semibold">{`RD${currencyFormat(
              getFare(budgetTotal)
            )}`}</span>
            {userRole === CLIENT && (
              <>
                {t("client.providerRemuneration")}
                <span className="font-semibold">{providerName}</span>?
              </>
            )}
            {userRole === PROVIDER && t("provider.workRemuneration")}
          </Typography>
          {userRole === CLIENT && (
            <Typography variant="h6" className="mb-4">
              {t("client.fareBreakdown")}
              {providerName}.
            </Typography>
          )}
        </>
      );
    }

    return (
      <Typography variant="h6" className="mb-4">
        {t("aboutToCancelOrder")}
        <span className="font-semibold">{serviceType}</span>
        {userRole === CLIENT && t("client.freeCancellation")}
        {userRole === PROVIDER && t("provider.unpaidCancellation")}
      </Typography>
    );
  };

  return (
    <>
      <div className="px-5">
        {getFareByStatus(cancellationStatus)}
        <Typography variant="h6" className="mb-5 break-words">
          <span className="font-semibold">{t("cancellationReason")}</span>
          {selectedReason}
        </Typography>
      </div>
      <div className="flex h-[135px] flex-col items-center gap-4 px-5">
        <StyledButton
          sx={{ fontSize: "13.5px", fontWeight: "600" }}
          variant="contained"
          className="left-0 right-0 rounded-[70px] bg-primary-dark capitalize hover:bg-primary-dark focus:bg-primary-dark"
          onClick={handleClick}
        >
          {t("cancelOrder")}
        </StyledButton>
        <StyledButton
          variant="outlined"
          className=" mt-0 border-2 border-primary-main bg-white text-xs font-semibold capitalize hover:border-2 hover:border-primary-main hover:bg-white focus:border-2 focus:border-primary-main focus:bg-white"
          onClick={handleCancelOrder}
        >
          {t("declineCancellation")}
        </StyledButton>
      </div>
    </>
  );
};

export default OrderCancellationConfirmation;
