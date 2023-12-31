import { Router } from "express";
import { add } from "./add";
import { validate } from "../../../middleware/validate";
import { addBalaceSchema } from "../../../schemas/user";

export function initUserBalanceRoutes(): Router {
  const router = Router();
  router.post("/add", validate(addBalaceSchema), add);
  return router;
}
