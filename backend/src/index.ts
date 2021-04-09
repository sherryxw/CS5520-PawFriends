import express from "express";
import mongoose from "mongoose";
import config from "./config";

mongoose
  .connect(config.mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log(`Connect to mongodb with url: ${config.mongoUrl}`);
    const app = express();

    app.get("/", (request, response) => {
      response.send("Hello World");
    });

    app.listen(config.port, () => {
      console.log(`The server is started at port ${config.port}`);
    });
  })
  .catch((reason) => {
    console.log(`Failed to connect mongodb: ${String(reason)}`);
    process.exit();
  });
