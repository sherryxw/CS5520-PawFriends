import client from "./client";
import _ from "lodash";

export const get = () => {
  return client.get("/example").then((response) => {
    return _.get(response.data, "message", "default") as string;
  });
};
