import { Close } from "@mui/icons-material";
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Typography,
} from "@mui/material";
import { useTranslations } from "next-intl";
import * as React from "react";
import { useCallback } from "react";

import { currencyFormat } from "@/utils/formats.utils";
import { getCommonBlack, getPrimaryDark } from "@/utils/theme";

import { ClientBudgetDialogProps, ProviderDialogProps } from "./type";

export const ProviderDialog = ({
  open,
  onClose: toggleOpen,
  title,
  content,
}: ProviderDialogProps) => {
  const t = useTranslations();

  return (
    <Dialog
      sx={{ "& .MuiDialog-paper": { borderRadius: "16px", width: "360px" } }}
      className="flex-col"
      aria-labelledby="draggable-dialog-title"
      open={open}
      PaperProps={{
        style: {
          marginLeft: "20px",
          marginRight: "20px",
          marginBottom: "143px",
        },
      }}
    >
      <DialogTitle
        color={"primary.dark"}
        className="w-[272px] flex-col pt-6 pb-4"
        id="alert-dialog-title"
        fontSize={"15px"}
        fontWeight={"body1.fontWeight"}
      >
        {title}
      </DialogTitle>
      <DialogContent>
        <DialogContentText
          id="alert-dialog-description"
          color={getCommonBlack}
          fontWeight={500}
          fontSize="13px"
        >
          {content}
        </DialogContentText>
      </DialogContent>
      <DialogActions className="mr-4 gap-3 pb-4">
        <Typography
          id="submit"
          variant="h4"
          className="pl-1 underline"
          color={getPrimaryDark}
          onClick={toggleOpen}
        >
          {t("common.close")}
        </Typography>
      </DialogActions>
    </Dialog>
  );
};

export const ClientBudgetDialog = ({
  amount,
  description,
  open,
  onClose: toggleOpen,
  onBudgetDecision,
}: ClientBudgetDialogProps) => {
  // translations
  const t = useTranslations("orderDetail.clientBudgetDialog");

  // handle budget decision
  const handleBudgetAccepted = useCallback(
    () => onBudgetDecision("ACCEPTED"),
    [onBudgetDecision]
  );
  const handleBudgetRejected = useCallback(
    () => onBudgetDecision("REJECTED"),
    [onBudgetDecision]
  );

  return (
    <Dialog
      open={open}
      PaperProps={{
        className: "m-0 rounded-2xl w-11/12",
      }}
    >
      <IconButton
        className="absolute m-2 self-end text-primary-dark"
        onClick={toggleOpen}
      >
        <Close className="h-6 w-6" />
      </IconButton>
      <Box className="flex flex-col items-center py-6">
        <DialogTitle className="font-poppins font-semibold text-lg text-center">
          {t("title")}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Box className="flex flex-col items-center gap-8 px-[3px] text-black">
              <Box className="flex flex-col items-center gap-4">
                <Box className="flex flex-row justify-between">
                  <Typography className="font-poppins font-normal text-sm leading-normal text-center">
                    {t("content")}
                  </Typography>
                </Box>
                <Box className="flex flex-row justify-between">
                  <Typography className="font-poppins font-medium text-3xl leading-5 text-primary-lighter text-center tracking-tight">
                    {`$ ${currencyFormat(amount)}`}
                  </Typography>
                </Box>
                <Box className="mt-2 flex flex-col justify-between gap-2">
                  <Typography className="font-poppins font-medium text-sm leading-normal text-center">
                    {t("workDescriptionTitle")}
                  </Typography>
                  <Typography className="font-poppins font-normal text-sm leading-normal text-center">
                    {description ?? ""}
                  </Typography>
                </Box>
              </Box>
              <Box className="flex w-full flex-row justify-between px-8">
                <Typography
                  className="font-poppins font-semibold text-base leading-normal text-center text-error-dark underline"
                  onClick={handleBudgetRejected}
                >
                  {t("reject")}
                </Typography>
                <Typography
                  className="font-poppins font-semibold text-base leading-normal text-center text-primary-dark underline"
                  onClick={handleBudgetAccepted}
                >
                  {t("accept")}
                </Typography>
              </Box>
            </Box>
          </DialogContentText>
        </DialogContent>
      </Box>
    </Dialog>
  );
};
