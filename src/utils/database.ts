import mongoose from "mongoose";
import logger from "./logger";

export async function connect() {
  const dbUri = process.env["MONGO_URI"];
  if (!dbUri) {
    logger.error("mongo uri not provided");
    process.exit();
  }

  try {
    await mongoose.connect(dbUri);
    // use an emoji to indicate success
    logger.info("🚀 Successfully connected to database")
  } catch (err) {
    logger.error(err);
    process.exit();
  }
}
