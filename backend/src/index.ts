import express from "express";
import cors from "cors";
import config from "./config";
import { dbInit } from "./dbInit";
import { exampleRouter } from "./routers";

const serverInit = () => {
  const app = express();

  app.use(cors());

  app.get("/", (request, response) => {
    response.send("Hello World");
  });

  app.use("/api/example", exampleRouter);

  app.listen(config.port, () => {
    console.log(`The server is started at port ${config.port}`);
  });
};

dbInit(serverInit);
