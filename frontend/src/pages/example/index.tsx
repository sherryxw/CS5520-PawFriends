import React, { useState } from "react";
import { Grid, Button } from "@material-ui/core";
import Counter from "./Counter";
import Toast, { ToastState } from "src/commons/Toast";
import ConfirmModal from "src/commons/ConfirmModal";
import api from "src/api";

const Example = () => {
  const [toastState, setToastState] = useState<ToastState>({
    open: false,
    severity: "success",
    message: "This is a toast message",
  });
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Counter />
      </Grid>
      <Grid item xs={12}>
        <Button
          color='primary'
          onClick={() => {
            setToastState({ ...toastState, open: true });
          }}
          variant='contained'
        >
          Open Toast
        </Button>
      </Grid>
      <Grid item xs={6}>
        <Button
          color='primary'
          onClick={() => {
            setModalOpen(true);
          }}
          variant='contained'
        >
          Call Example API
        </Button>
      </Grid>
      <Grid item xs={6}>
        API response: {message}
      </Grid>
      <Toast
        onClose={() => setToastState({ ...toastState, open: false })}
        toastState={toastState}
      />
      <ConfirmModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        header='Call example api'
        text='Do you want to call example api?'
        confirmText='Yes'
        onConfirm={() => {
          return api.example.get().then((value) => {
            setMessage(value);
          });
        }}
        cancelText='No'
      />
    </Grid>
  );
};

export default Example;
