import React, { useState, Fragment } from "react";
import { Container, Row, Col, Button } from "reactstrap";
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
    <Fragment>
      <Container>
        <Row className={"mb-4"} xs={12}>
          <Col xs={12}>
            <Counter />
          </Col>
        </Row>
      </Container>
      <Container>
        <Row xs={12} className={"mb-4"}>
          <Col>
            <Button
              color='primary'
              onClick={() => {
                setToastState({ ...toastState, open: true });
              }}
              variant='contained'
            >
              Open Toast
            </Button>
          </Col>
        </Row>
      </Container>
      <Container>
        <Row className={"mb-4"}>
          <Col xs={4}>
            <Button
              color='primary'
              onClick={() => {
                setModalOpen(true);
              }}
              variant='contained'
            >
              Call Example API
            </Button>
          </Col>
          <Col>API response: {message}</Col>
        </Row>
      </Container>

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
    </Fragment>
  );
};

export default Example;
