import cors from "cors";
import { configDotenv } from "dotenv";
import express from "express";
import morgan from "morgan";
import logger from "./utils/logger";
import { initRoutes } from "./controllers/routes";
import { connect } from "./utils/database";
import validateJwt from "./middleware/validate_jwt";

(async function () {
  // config dotenv
  configDotenv();

  // connect to database
  await connect();

  // create express app
  const app = express();

  // config middlewares
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cors());
  app.use(
    morgan(
      ":remote-addr :remote-user :method :url HTTP/:http-version :status :res[content-length] - :response-time ms",
    ),
  );
  app.use(validateJwt);

  app.use("/api", initRoutes());

  const PORT = process.env["PORT"] || 8080;
  app.listen(PORT, () =>
    logger.info(`🚀 Started server at http://localhost:${PORT}`),
  );
})();
