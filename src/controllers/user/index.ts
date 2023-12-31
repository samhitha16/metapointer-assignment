import { Router } from "express";
import { register } from "./register";
import { validate } from "../../middleware/validate";
import { createUserSchema, loginUserSchema } from "../../schemas/user";
import { login } from "./login";
import authorize from "../../middleware/authorize";
import { logout } from "./logout";

export function initUserRoutes(): Router {
  const router = Router();
  router.post("/register", validate(createUserSchema), register);
  router.post("/login", validate(loginUserSchema), login);
  router.post("/logout", authorize, logout);
  return router;
}
