import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

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
    <Modal
      centered
      isOpen={open}
      onClose={onClose}
      size={"sm"}
      toggle={onClose}
    >
      <ModalHeader>{header}</ModalHeader>
      <ModalBody>{text}</ModalBody>
      <ModalFooter>
        <Button
          color='primary'
          onClick={() => {
            onConfirm().finally(onClose);
          }}
          variant={"contained"}
        >
          {confirmText}
        </Button>
        <Button
          color='secondary'
          onClick={() => {
            if (onCancel) {
              onCancel().finally(onClose);
            } else {
              onClose();
            }
          }}
          outline
        >
          {cancelText}
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default ConfirmModal;
