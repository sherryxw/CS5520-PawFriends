import { combineReducers } from "redux";
import { CounterStore, counterStoreReducer } from "./counter";

// Type of this redux store
export interface StoreState {
  counterStore: CounterStore;
}

export const rootReducer = combineReducers({
  counterStore: counterStoreReducer,
});

export default rootReducer;
