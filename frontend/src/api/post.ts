import client from "./client";
import { IPost } from "src/types/post";
import { mockPost } from "./mock";

export const get = (query?: {
  carMake?: string;
  carModel?: string;
  zipCode?: string;
  lowestPrice?: number;
  highestPrice?: number;
}): Promise<IPost[]> => {
  return Promise.resolve(mockPost);
};
