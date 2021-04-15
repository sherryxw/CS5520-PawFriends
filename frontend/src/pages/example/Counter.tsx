import React from "react";
import { Container, Row, Col, Button } from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import {
  getCounterStore,
  increaseCounterStore,
  decreaseCounterStore,
} from "src/redux/counter";

const Counter = () => {
  const counterStore = useSelector(getCounterStore);
  const dispatch = useDispatch();

  return (
    <Container>
      <Row>
        <Col xs={2}>Counter value: {counterStore}</Col>
        <Col xs={2}>
          <Button
            color='primary'
            onClick={() => {
              dispatch(increaseCounterStore(1));
            }}
          >
            increase
          </Button>
        </Col>
        <Col xs={2}>
          <Button
            color='secondary'
            onClick={() => {
              dispatch(decreaseCounterStore(1));
            }}
          >
            decrease
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default Counter;
