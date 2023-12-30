import { Router } from "express";
import { initUserRoutes } from "./user";

export function initRoutes(): Router {
  const router = Router();
  router.use("/health", (_, res) => res.json({ message: "OK" }));
  router.use("/user", initUserRoutes());
  return router;
}
