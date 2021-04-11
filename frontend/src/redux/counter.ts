import { StoreState } from ".";
// Store
export type CounterStore = number;

const initialState: CounterStore = 0;

// Constants
export type INCREASE_COUNTER_STORE = "INCREASE_COUNTER_STORE";
export type DECREASE_COUNTER_STORE = "DECREASE_COUNTER_STORE";
const INCREASE_COUNTER_STORE = "INCREASE_COUNTER_STORE";
const DECREASE_COUNTER_STORE = "DECREASE_COUNTER_STORE";

// Actions
export type IncreaseCounterStore = {
  type: INCREASE_COUNTER_STORE;
  payload: number;
};

export type DecreaseCounterStore = {
  type: DECREASE_COUNTER_STORE;
  payload: number;
};

export const increaseCounterStore = (count: number): IncreaseCounterStore => {
  return {
    type: INCREASE_COUNTER_STORE,
    payload: count,
  };
};

export const decreaseCounterStore = (count: number): DecreaseCounterStore => {
  return {
    type: DECREASE_COUNTER_STORE,
    payload: count,
  };
};

export type CounterStoreActions = IncreaseCounterStore | DecreaseCounterStore;

// Reducer
export const counterStoreReducer = (
  state = initialState,
  action: CounterStoreActions
): CounterStore => {
  switch (action.type) {
    case INCREASE_COUNTER_STORE:
      return state + action.payload;
    case DECREASE_COUNTER_STORE:
      return state - action.payload;
    default:
      return state;
  }
};

// Selectors
export const getCounterStore = (state: StoreState) => state.counterStore;
