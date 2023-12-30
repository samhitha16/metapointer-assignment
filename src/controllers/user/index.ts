import { Router } from "express";
import { register } from "./register";
import { validate } from "../../middleware/validate";
import { createUserSchema, loginUserSchema } from "../../schemas/user";
import { login } from "./login";

export function initUserRoutes(): Router {
  const router = Router();
  router.post("/register", validate(createUserSchema), register);
  router.post("/login", validate(loginUserSchema), login);
  return router;
}
