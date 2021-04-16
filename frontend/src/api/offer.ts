import client from "./client";
import { IOffer } from "src/types/offer";

export const create = (offer: IOffer) => {
  return Promise.resolve(offer);
};
