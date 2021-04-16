import React from "react";
import "./Toast.css";
import { Alert } from "reactstrap";

type Color =
  | "primary"
  | "secondary"
  | "success"
  | "danger"
  | "warning"
  | "info"
  | "light"
  | "dark";

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
  const handleClose = (event: any) => {
    onClose();
  };

  return (
    <Alert
      className={"custom-toast"}
      fade={true}
      isOpen={toastState.open}
      toggle={handleClose}
      style={{ zIndex: 9999 }}
    >
      {toastState.message}
    </Alert>
  );
};

export default Toast;
