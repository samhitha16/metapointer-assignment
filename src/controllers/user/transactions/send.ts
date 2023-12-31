import { Request, Response } from "express";
import { TransferAmountSchema } from "../../../schemas/user";
import { Claims } from "../../../utils/jwt";
import { send as sendAmount } from "../../../services/user/transactions/send";
import { ApiError, ApiErrorType } from "../../../error";

export async function send(
  req: Request<any, any, TransferAmountSchema["body"]>,
  res: Response<any, { claims: Claims }>,
) {
  const { amount, receiverId } = req.body;
  const {
    claims: { userId },
  } = res.locals;

  const discount = generateDiscount(amount);

  const transactionResult = await sendAmount({
    senderId: userId,
    receiverId: receiverId,
    amount,
    discount: discount.cashbackAmount,
  });

  if (transactionResult.isErr) {
    const err = transactionResult.error;
    if (err instanceof ApiError) {
      if (err.type === ApiErrorType.ValidationError) {
        return res.status(400).json({ message: err.message });
      }
    }
    return res.status(500).json({ message: transactionResult.error.message });
  }

  return res.json({
    transaction: transactionResult.value,
    discount,
    message: "transfer successful",
  });
}
function generateDiscount(transactionAmount: number) {
  if (transactionAmount % 500 === 0) {
    const randomCoupon = Math.random() < 0.5; // 50% chance of getting a coupon
    if (randomCoupon) {
      return {
        cashbackAmount: 0,
        message:
          "Congratulations! You got a coupon. Better luck next time for cashback.",
      };
    } else {
      return {
        cashbackAmount: 0,
        message: "Better luck next time for both cashback and coupon.",
      };
    }
  }

  // Check transaction amount for cashback
  let cashbackPercentage = 0;
  if (transactionAmount < 1000) {
    cashbackPercentage = 5;
  } else if (transactionAmount > 1000) {
    cashbackPercentage = 2;
  }

  // Calculate cashback amount
  const cashbackAmount = (cashbackPercentage / 100) * transactionAmount;

  return {
    cashbackAmount,
    message: `Congratulations! You got ${cashbackPercentage}% cashback.`,
  };
}
