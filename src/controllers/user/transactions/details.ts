import { Request, Response } from "express";
import { Claims } from "../../../utils/jwt";
import { details as getTransactions } from "../../../services/user/transactions/details";

export async function details(
  _: Request,
  res: Response<any, { claims: Claims }>,
) {
  const { userId } = res.locals.claims;

  const transactionsResult = await getTransactions({
    senderId: userId,
  });

  if (transactionsResult.isErr) {
    return res.status(500).send({ message: transactionsResult.error.message });
  }
  const transactions = transactionsResult.value;

  return res.json({ transactions });
}
