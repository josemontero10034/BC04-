import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from "@mui/material";
import { useTranslations } from "next-intl";
import * as React from "react";

import { getCommonBlack, getPrimaryDark } from "@/utils/theme";

import { DeleteCardProps } from "./types";

const DeleteConfirmation = ({
  openedModal,
  value,
  setOpenModal,
  onClick,
}: DeleteCardProps) => {
  const t = useTranslations();
  const handleClose = () => setOpenModal(false);
  const handleClick = () => onClick(value);

  return (
    <Dialog
      sx={{ "& .MuiDialog-paper": { borderRadius: "16px", width: "360px" } }}
      className="flex-col"
      open={openedModal}
      PaperProps={{
        style: {
          marginLeft: "20px",
          marginRight: "20px",
          marginBottom: "143px",
        },
      }}
    >
      <DialogTitle
        className="flex-col pt-6 pb-6 w-[272px]"
        id="alert-dialog-title"
        color={getPrimaryDark}
        variant="body1"
      >
        {t.rich("common.confirmation")}
      </DialogTitle>
      <DialogContent>
        <DialogContentText
          id="alert-dialog-description"
          color={getCommonBlack}
          variant="body2"
        >
          {t("common.warning")}
        </DialogContentText>
      </DialogContent>
      <DialogActions className="pb-[30px] mr-4 gap-3">
        <Typography
          id="submit"
          variant="h4"
          className="underline pl-1"
          color={getPrimaryDark}
          onClick={handleClose}
        >
          {t("common.close")}
        </Typography>
        <Typography
          id="delete"
          className="underline pl-1"
          variant="h4"
          color={"#B91616"}
          onClick={handleClick}
        >
          {t("common.delete")}
        </Typography>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteConfirmation;
