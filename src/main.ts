import cors from "cors"
import { configDotenv } from "dotenv"
import express from "express"
import morgan from "morgan"
import logger from "./utils/logger"

(function() {
  // config dotenv
  configDotenv()

  // create express app
  const app = express()

  // config middlewares
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cors());
  app.use(
    morgan(
      ":remote-addr :remote-user :method :url HTTP/:http-version :status :res[content-length] - :response-time ms",
    ),
  );

  const PORT = process.env["PORT"] || 8080
  app.listen(PORT, () => logger.info(`Started listening at port:${PORT}`))
})()
