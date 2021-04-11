import mongoose from "mongoose";
import config from "./config";

const dbInit = (callback: () => void) => {
  mongoose
    .connect(config.mongoUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log(`Connect to mongodb with url: ${config.mongoUrl}`);
      callback();
    })
    .catch((error) => {
      console.log(
        `Failed to initialize mongodb with url(${config.mongoUrl}): ${String(
          error
        )}`
      );
      process.exit(1);
    });
};

export default dbInit;
