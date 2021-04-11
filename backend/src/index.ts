import express from "express";
import config from "./config";
import dbInit from "./db-init";

const serverInit = () => {
  const app = express();

  app.get("/", (request, response) => {
    response.send("Hello World");
  });

  app.listen(config.port, () => {
    console.log(`The server is started at port ${config.port}`);
  });
};

dbInit(serverInit);
