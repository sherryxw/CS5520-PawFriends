import React from "react";
import { Snackbar } from "@material-ui/core";
import Alert, { Color } from "@material-ui/lab/Alert";

export type ToastState = {
  open: boolean; // Is the toast open
  severity: Color; // Color of the toast. There are four types of color: success, info, warning, and error
  message: string; // Toast message.
};

type Props = {
  toastState: ToastState;
  onClose: () => void;
};

/**
 * Toasts inform users of short messages about the app. They appear temporarily, towards the bottom of the screen
 */
const Toast = ({ toastState, onClose }: Props) => {
  const handleClose = (event: any, reason: string) => {
    if (reason !== "clickaway") {
      onClose();
    }
  };

  return (
    <Snackbar
      open={toastState.open}
      autoHideDuration={6000}
      onClose={handleClose}
    >
      <Alert
        elevation={6}
        variant='filled'
        severity={toastState.severity}
        onClose={onClose}
      >
        {toastState.message}
      </Alert>
    </Snackbar>
  );
};

export default Toast;
