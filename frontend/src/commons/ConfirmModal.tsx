import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@material-ui/core";
import { Check, Close } from "@material-ui/icons";

type Props = {
  open: boolean; // Is the modal open
  onClose: () => void; // Callback fired when the component requests to be closed.
  header: string; // Header of the modal
  text: string; // Content of the modal
  confirmText: string; // Confirm button string
  onConfirm: () => Promise<void>; // Callback fired when users click on the confirm button
  cancelText: string; // Cancel button string
  onCancel?: () => Promise<void>; // Callback fired when users click on the cancel button.
};

/**
 * ConfirmModal is used to display a dialog to let users confirm their decisions.
 */
const ConfirmModal = ({
  open,
  onClose,
  header,
  text,
  confirmText,
  onConfirm,
  cancelText,
  onCancel,
}: Props) => {
  return (
    <Dialog fullWidth maxWidth={"sm"} open={open} onClose={onClose}>
      <DialogTitle>{header}</DialogTitle>
      <DialogContent dividers>{text}</DialogContent>
      <DialogActions>
        <Button
          color='primary'
          startIcon={<Check />}
          onClick={() => {
            onConfirm().finally(onClose);
          }}
          variant={"contained"}
        >
          {confirmText}
        </Button>
        <Button
          color='secondary'
          startIcon={<Close />}
          onClick={() => {
            if (onCancel) {
              onCancel().finally(onClose);
            } else {
              onClose();
            }
          }}
          variant={"outlined"}
        >
          {cancelText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmModal;
