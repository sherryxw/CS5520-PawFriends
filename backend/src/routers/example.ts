import express from "express";
import getUserMetadate from "../utils/userUtils";

export const exampleRouter = express.Router();

exampleRouter.get("/", (request, response) => {
  getUserMetadate("auth0|607cd3d1599f83006ad55079").then((result: any) => {
    console.log(result);
  });

  response.send({ message: "example api" });
});
