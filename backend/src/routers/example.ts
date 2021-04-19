import express from "express";
import getUserMetadate from "../utils/userUtils";

export const exampleRouter = express.Router();

exampleRouter.get("/", (request, response) => {
  getUserMetadate("auth0|607badd0c9c93e006b8108be").then((result: any) => {
    console.log(result);
  });

  response.send({ message: "example api" });
});
