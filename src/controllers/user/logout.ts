import { Request, Response } from "express";
import { Delete } from "../../services/session/delete";
import { Claims } from "../../utils/jwt";

export async function logout(
  _: Request,
  res: Response<any, { claims: Claims }>,
) {
  const {
    claims: { sessionId, userId },
  } = res.locals;

  await Delete({
    _id: sessionId,
    userId: userId,
  });

  return res.json({ message: "logout successful" });
}
