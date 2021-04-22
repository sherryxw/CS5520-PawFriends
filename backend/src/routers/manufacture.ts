import express from "express";
import _ from "lodash";
import { manufacture } from "../models/manufacture";

export const manufactureRouter = express.Router();

manufactureRouter.get("", (request, response) => {
  const makeList = Object.keys(manufacture);
  response.send({ makeList: makeList });
});

manufactureRouter.get("/:make", (request, response) => {
  const modelList = manufacture[request.params.make];
  if (_.isNil(modelList)) {
    response.send({ modelList: [] });
  } else {
    response.send({ modelList });
  }
});
