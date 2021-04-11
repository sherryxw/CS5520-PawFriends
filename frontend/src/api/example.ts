import client from "./client";
import _ from "lodash";

export const get = async () => {
  const response = await client.get("/example");
  return _.get(response.data, "message", "default") as string;
};
