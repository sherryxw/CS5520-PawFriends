import client from "./client";
import { IPost } from "src/types/post";
import _ from "lodash";

export const get = async (query?: {
  carMake?: string;
  carModel?: string;
  zipCode?: string;
  lowestPrice?: number;
  highestPrice?: number;
}) => {
  const params: any = {};
  if (query?.carMake && query.carMake !== "Any Make") {
    params.carMake = query.carMake;
  }
  if (query?.carMake && query.carModel !== "Any Model") {
    params.carModel = query.carModel;
  }
  if (query?.zipCode) {
    params.zipCode = query.zipCode;
  }
  params.lowestPrice = _.get(query, "lowestPrice", 0);
  if (query?.highestPrice && _.get(query, "query?.highestPrice", 0) > 0) {
    params.highestPrice = query.highestPrice;
  }
  const response = await client.get("/posts", {
    params,
  });
  return response.data.postList as IPost[];
};
