import client from "./client";
import { IOffer } from "src/types/offer";

export const create = async (offer: IOffer) => {
  await client.post("/offers", offer);
};
