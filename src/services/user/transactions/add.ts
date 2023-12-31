import { Result } from "@badrap/result";
import { ApiError, ApiErrorType } from "../../../error";
import UserModel from "../../../models/user";
import { create } from "./create";
import { TransactionType } from "../../../models/transaction";

export async function add(query: { amount: number; senderId: string }) {
  const { amount, senderId } = query;
  try {
    const user = await UserModel.findOneAndUpdate(
      { _id: senderId },
      { $inc: { balance: amount } },
      { new: true },
    );
    if (!user) {
      new ApiError(ApiErrorType.InternalServerError, "Something went wrong");
    }
    const transactionResult = await create({
      senderId,
      receiverId: senderId,
      amount,
      type: TransactionType.Credit,
    });

    if (transactionResult.isErr) {
      return Result.err(transactionResult.error);
    }

    return Result.ok(transactionResult.value);
  } catch (e) {
    return Result.err(
      new ApiError(ApiErrorType.InternalServerError, "Something went wrong"),
    );
  }
}
