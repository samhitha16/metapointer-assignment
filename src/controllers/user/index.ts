import { Router } from "express";
import { register } from "./register";
import { validate } from "../../middleware/validate";
import { createUserSchema } from "../../schemas/user";

export function initUserRoutes(): Router {
  const router = Router();
  router.post("/register", validate(createUserSchema), register);
  return router;
}
