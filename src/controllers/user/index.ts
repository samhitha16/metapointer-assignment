import { Router } from "express";
import { register } from "./register";
import { validate } from "../../middleware/validate";
import { createUserSchema, loginUserSchema } from "../../schemas/user";
import { login } from "./login";
import authorize from "../../middleware/authorize";
import { logout } from "./logout";
import { initUserBalanceRoutes } from "./transactions";
import { balance } from "./balance";

export function initUserRoutes(): Router {
  const router = Router();
  router.use("/transactions", authorize, initUserBalanceRoutes());
  router.post("/register", validate(createUserSchema), register);
  router.post("/login", validate(loginUserSchema), login);
  router.post("/logout", authorize, logout);
  router.get("/balance", authorize, balance);
  return router;
}
