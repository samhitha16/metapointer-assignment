import { Router } from "express";
import { add } from "./add";
import { validate } from "../../../middleware/validate";
import { addBalaceSchema, transferAmountSchema } from "../../../schemas/user";
import { send } from "./send";
import { details } from "./details";

export function initUserBalanceRoutes(): Router {
  const router = Router();
  router.get("/", details);
  router.post("/add", validate(addBalaceSchema), add);
  router.post("/send", validate(transferAmountSchema), send);
  return router;
}
