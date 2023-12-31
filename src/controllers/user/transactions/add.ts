import { Request, Response } from "express";
import { AddBalanceSchema } from "../../../schemas/user";
import { Claims } from "../../../utils/jwt";
import { add as addBalance } from "../../../services/user/transactions/add";

export async function add(
  req: Request<{}, {}, AddBalanceSchema["body"]>,
  res: Response<any, { claims: Claims }>,
) {
  const { amount } = req.body;
  const {
    claims: { userId },
  } = res.locals;
  const transactionResult = await addBalance({ amount, senderId: userId });

  if (transactionResult.isErr) {
    const e = transactionResult.error;
    return res.status(500).send({ message: e.message });
  }
  const transaction = transactionResult.value;

  return res.json(transaction);
}
