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
import { useCallback } from "react";

import { getCommonBlack, getPrimaryDark } from "@/utils/theme";
import { trpc } from "@/utils/trpc";

import { DeleteAdressProps } from "../addresses-view-delete/types";

const CancelationModal = ({
  openedModal,
  setOpenModal,
  addressId,
}: DeleteAdressProps) => {
  const t = useTranslations();
  const deleteAddressMutator = trpc.address.deleteAddress.useMutation();

  const handleClose = () => {
    setOpenModal(false);
  };

  const handleDelete = useCallback(async () => {
    if (addressId) {
      await deleteAddressMutator.mutateAsync({ addressId }).then(() => {
        setOpenModal(false);
      });
    }
  }, [addressId, deleteAddressMutator, setOpenModal]);

  return (
    <Dialog
      sx={{ "& .MuiDialog-paper": { borderRadius: "16px", width: "360px" } }}
      className="flex-col"
      aria-labelledby="draggable-dialog-title"
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
          className="underline pl-1 text-primary-dark"
          onClick={handleClose}
        >
          {t("common.close")}
        </Typography>
        <Typography
          id="delete"
          variant="h4"
          className="underline pl-1 text-common-red"
          onClick={handleDelete}
        >
          {t("common.delete")}
        </Typography>
      </DialogActions>
    </Dialog>
  );
};

export default CancelationModal;
