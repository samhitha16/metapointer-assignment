import { NextFunction, Request, Response } from "express";
import { Claims } from "../utils/jwt";
import { details } from "../services/session";

export default async (
  _: Request,
  res: Response<any, { claims?: Claims }>,
  next: NextFunction,
) => {
  const claims = res.locals.claims;
  if (!claims) {
    return res.sendStatus(403);
  }
  const sessionResult = await details({ _id: claims.sessionId });
  if (sessionResult.isErr) return res.sendStatus(403);
  const session = sessionResult.value;
  if (!session.valid) return res.sendStatus(403);
  return next();
};
