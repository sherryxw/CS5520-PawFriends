import express from "express";
import getUserMetadate from "../utils/userUtils";

export const userRouter = express.Router();

userRouter.get("/:id", (request, response, next) => {
  getUserMetadate(request.params.id)
    .then((metadata) => {
      response.send(metadata);
    })
    .catch((error) => {
      next(error);
    });
});
