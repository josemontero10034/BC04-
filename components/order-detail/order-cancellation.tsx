import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Checkbox,
  IconButton,
  SwipeableDrawer,
  Typography,
} from "@mui/material";
import { OfferStatus, OrderStatus, UserRole } from "@prisma/client";
import { useTranslations } from "next-intl";
import { useState } from "react";

import { getCommonBlack, getPrimaryDark } from "@/utils/theme";

import { DetailedText } from "../shared/custom-fields";
import { StyledButton } from "../shared/styled-components";
import OrderCancellationConfirmation from "./order-cancellation-confirmation";
import { iconCancellationReasons } from "./order-utils";
import { OrderCancellationProps, OrderCancellationStatus } from "./type";

type Cancellation = {
  selectReason: string;
  reasonId: string;
  isCurrentReasonSelected: boolean;
  isOtherReason: boolean;
  isReasonIncluded: boolean;
  status: OrderCancellationStatus;
};

const OrderCancellation = ({
  order,
  isOpen,
  onClose: handleSwipeable,
  onOpen: handleOnOpen,
  userRole,
}: OrderCancellationProps) => {
  const t = useTranslations("orderDetail.cancellation");
  const { ASSIGNED, EVALUATING, IN_PROGRESS } = OrderStatus;
  const { ACCEPTED } = OfferStatus;
  const { CLIENT } = UserRole;
  const [cancellation, setCancellation] = useState<Cancellation>({
    selectReason: "",
    reasonId: "",
    isCurrentReasonSelected: false,
    isOtherReason: false,
    isReasonIncluded: false,
    status:
      (order?.status === EVALUATING || order?.status === IN_PROGRESS) &&
      order?.budget !== null
        ? order?.budget?.status
        : order?.status,
  });

  const reasonsByStatus = (status: OrderCancellationStatus) => {
    // Check en.json in orderDetail.cancellation.reasons
    if (status === ASSIGNED || status === EVALUATING) {
      const reasons = [];

      reasons.push({ id: "1", reason: "unavailableRequiredDate" });
      if (userRole === CLIENT) {
        reasons.push({ id: "2", reason: "resolvedExternallyClient" });
      }
      reasons.push(
        { id: "3", reason: "ineffectiveCommunication" },
        { id: "4", reason: "personalsReasons" }
      );
      if (userRole === CLIENT) {
        reasons.push({ id: "5", reason: "wantAnotherProvider" });
      } else {
        reasons.push({ id: "6", reason: "conflictiveClient" });
        if (status === EVALUATING) {
          reasons.push({ id: "7", reason: "resolvedExternallyProvider" });
        }
      }

      return reasons;
    } else if (order?.budget !== null) {
      const reasons = [];

      if (userRole === CLIENT) {
        reasons.push({ id: "1", reason: "resolvedExternallyClient" });
      } else if (status === ACCEPTED) {
        reasons.push({ id: "2", reason: "resolvedExternallyProvider" });
      }
      reasons.push(
        { id: "3", reason: "dissatisfactionService" },
        { id: "4", reason: "budgetDisagreement" },
        { id: "5", reason: "unavailableRequiredDate" }
      );

      return reasons;
    }

    return [
      { id: "1", reason: "resolvedExternallyClient" },
      { id: "2", reason: "notMatchingWithProviders" },
      { id: "3", reason: "unintendedRequest" },
    ];
  };

  const handleOnClick = () => {
    if (!cancellation.isReasonIncluded) {
      setCancellation({ ...cancellation, isReasonIncluded: true });
    }
  };

  const handleCancelOrder = () => {
    setCancellation({ ...cancellation, isReasonIncluded: false });
  };

  return (
    <SwipeableDrawer
      PaperProps={{
        style: {
          maxWidth: "360px",
          borderTopLeftRadius: "8.33% 5.75%",
          borderTopRightRadius: "8.33% 5.75%",
          display: "flex",
          margin: "auto",
          paddingBottom: "2.78%",
        },
      }}
      open={isOpen}
      onOpen={handleOnOpen}
      onClose={handleSwipeable}
      anchor="bottom"
    >
      <div className="px-5 pt-5">
        <IconButton
          onClick={handleSwipeable}
          className="absolute justify-start p-[5px] top-4"
        >
          <CloseIcon className="text-primary-dark w-5 h-5" />
        </IconButton>
        <Typography
          color={getPrimaryDark}
          className="flex justify-center mb-4 text-base font-semibold"
        >
          {t("cancelOrder")}
        </Typography>
      </div>
      {cancellation.isReasonIncluded ? (
        <OrderCancellationConfirmation
          order={order}
          onClose={handleOnClick}
          onOpen={handleCancelOrder}
          selectedReason={cancellation.selectReason}
          cancellationStatus={cancellation.status}
          userRole={userRole}
        />
      ) : (
        <div>
          <Typography className="h-14 pl-5 flex items-center text-[15px] font-medium">
            {t("reasonQuestion")}
          </Typography>
          {reasonsByStatus(cancellation.status ?? "CREATED")?.map((items) => (
            <Box
              key={items.id}
              className="border-b-[1px] border-b-[#E7ECEE] flex space-x-3 h-14 pl-5 items-center hover:bg-[#F0F5FF]"
            >
              <div>{iconCancellationReasons[items.reason]}</div>
              <Typography variant="h6" color={getCommonBlack}>
                {t(`reasons.${items.reason}` as any)}
              </Typography>
              <Checkbox
                className="flex w-full h-14 absolute right-4"
                icon={<></>}
                color="success"
                checked={
                  cancellation.reasonId === items.id &&
                  cancellation.isCurrentReasonSelected
                    ? true
                    : false
                }
                onChange={(e) => {
                  setCancellation({
                    ...cancellation,
                    reasonId: items.id,
                    isCurrentReasonSelected: e.target.checked,
                    selectReason: t(`reasons.${items.reason}` as any),
                  });
                }}
                checkedIcon={
                  <CheckIcon className="w-5 h-5 flex absolute right-0" />
                }
              />
            </Box>
          ))}

          <Box className="flex space-x-3 h-14 pl-5 items-center hover:bg-[#F0F5FF]">
            <div>{iconCancellationReasons["otherReasons"]}</div>
            <Typography variant="h6" color={getCommonBlack}>
              {t("reasons.other")}
            </Typography>
            <Checkbox
              className="flex w-full h-14 absolute right-4"
              checked={
                cancellation.isOtherReason &&
                !cancellation.isCurrentReasonSelected
              }
              icon={<></>}
              onChange={(e) => {
                setCancellation({
                  ...cancellation,
                  isOtherReason: e.target.checked,
                  isCurrentReasonSelected: false,
                  selectReason: "",
                });
              }}
              color="success"
              checkedIcon={
                <CheckIcon className="w-5 h-5 flex absolute right-0" />
              }
            />
          </Box>
          {cancellation.isOtherReason &&
            !cancellation.isCurrentReasonSelected && (
              <Box className="pl-5 mt-6">
                <DetailedText
                  name="details"
                  label={t("description")}
                  value={cancellation.selectReason}
                  maxChar={150}
                  minRows={3}
                  handleChange={(e) => {
                    setCancellation({
                      ...cancellation,
                      selectReason: e.target.value,
                    });
                  }}
                  height="85px"
                  width="320px"
                />
              </Box>
            )}
          <div className="mx-5">
            <StyledButton
              sx={{ fontSize: "13.5px", fontWeight: "600" }}
              variant="contained"
              className="bg-primary-dark hover:bg-primary-dark focus:bg-primary-dark rounded-[70px] mt-4 left-0 right-0 h-[43px] w-[100%] capitalize flex items-center"
              onClick={handleOnClick}
            >
              {t("cancel")}
            </StyledButton>
          </div>
        </div>
      )}
    </SwipeableDrawer>
  );
};

export default OrderCancellation;
