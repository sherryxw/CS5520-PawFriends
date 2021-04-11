import React from "react";
import { Grid, Button } from "@material-ui/core";
import { PlusOne, ExposureNeg1 } from "@material-ui/icons";
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
    <Grid container spacing={3}>
      <Grid item xs={2}>
        Counter value: {counterStore}
      </Grid>
      <Grid item xs={2}>
        <Button
          color='primary'
          endIcon={<PlusOne />}
          onClick={() => {
            dispatch(increaseCounterStore(1));
          }}
          variant='contained'
        >
          increase
        </Button>
      </Grid>
      <Grid item xs={2}>
        <Button
          color='secondary'
          endIcon={<ExposureNeg1 />}
          onClick={() => {
            dispatch(decreaseCounterStore(1));
          }}
          variant='contained'
        >
          decrease
        </Button>
      </Grid>
    </Grid>
  );
};

export default Counter;
