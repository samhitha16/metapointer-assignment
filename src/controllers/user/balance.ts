import { details } from "../../services/user";
import { Claims } from "../../utils/jwt";
import { Response, Request } from "express";

export async function balance(
  _: Request,
  res: Response<any, { claims: Claims }>,
) {
  const {
    claims: { userId },
  } = res.locals;
  const balance = await details({ _id: userId }, { balance: 1 });
  if (balance.isOk) {
    return res.json({ balance: balance.value.balance });
  }

  return res.status(500).json({ message: "Something went wrong" });
}
