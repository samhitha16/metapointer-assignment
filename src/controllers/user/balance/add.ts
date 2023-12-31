import { Request, Response } from "express";
import { AddBalanceSchema } from "../../../schemas/user";
import { Claims } from "../../../utils/jwt";
import { add as addBalance } from "../../../services/user/balance/add";

export async function add(
  req: Request<{}, {}, AddBalanceSchema["body"]>,
  res: Response<any, { claims: Claims }>,
) {
  const { amount } = req.body;
  const {
    claims: { userId },
  } = res.locals;
  const newBalanceResult = await addBalance({ amount, userId });

  if (newBalanceResult.isErr) {
    const e = newBalanceResult.error;
    return res.status(500).send({ message: e.message });
  }
  const newBalance = newBalanceResult.value;

  return res.json({
    message: `Added ${amount} to your balance, your new balance is ${newBalance}`,
  });
}
