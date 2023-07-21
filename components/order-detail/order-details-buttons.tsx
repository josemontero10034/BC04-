import { Box } from "@mui/material";
import { UserRole } from "@prisma/client";
import { useTranslations } from "next-intl";
import React from "react";

import { StyledButton } from "../shared/styled-components";

interface OrderDetailsButtonsProps {
  hasProviderAssigned: boolean;
  role: UserRole | undefined;
  statusToggler: () => void;
}

const OrderDetailsButtons = ({
  role,
  hasProviderAssigned,
  statusToggler,
}: OrderDetailsButtonsProps) => {
  const t = useTranslations("orderDetail");

  if (role === UserRole.CLIENT) {
    return (
      <Box
        className={`fixed bottom-0 z-20 flex w-full flex-col items-center justify-between gap-2 border-t-[1px] border-primary-main bg-white p-2`}
      >
        <StyledButton
          variant="contained"
          className="mt-0 border-2 bg-primary-dark hover:bg-primary-dark focus:bg-primary-dark"
          onClick={statusToggler}
        >
          {t("cancelOrder")}
        </StyledButton>
      </Box>
    );
  }

  if (role === UserRole.PROVIDER) {
    return (
      <Box
        className={`fixed bottom-0 z-20 flex w-full flex-row items-center justify-between gap-2 border-t-[1px] border-primary-main bg-white p-2`}
      >
        {!hasProviderAssigned ? (
          <>
            <StyledButton
              variant="outlined"
              className="mt-0 border-2 border-primary-dark bg-white hover:bg-white focus:bg-white text-primary-dark"
            >
              {t("decline")}
            </StyledButton>
            <StyledButton
              variant="contained"
              className="mt-0 border-2 bg-primary-dark hover:bg-primary-dark focus:bg-primary-dark"
            >
              {t("accept")}
            </StyledButton>
          </>
        ) : (
          <>
            <StyledButton
              variant="outlined"
              className="mt-0 border-2 border-primary-dark bg-white hover:bg-white focus:bg-white text-primary-dark"
              onClick={statusToggler}
            >
              {t("cancel")}
            </StyledButton>
            <StyledButton
              variant="contained"
              className="mt-0 border-2 bg-primary-dark hover:bg-primary-dark focus:bg-primary-dark"
            >
              {t("finalizeOrder")}
            </StyledButton>
          </>
        )}
      </Box>
    );
  }

  return <></>;
};

export default OrderDetailsButtons;
