import { Result } from "@badrap/result";
import { ApiError, ApiErrorType } from "../../../error";
import UserModel from "../../../models/user";
import { create } from "./create";
import { TransactionType } from "../../../models/transaction";
import { details } from "../details";

export async function send(input: {
  senderId: string;
  receiverId: string;
  amount: number;
  discount: number;
}) {
  const { senderId, receiverId, amount, discount } = input;

  if (senderId === receiverId) {
    return Result.err(
      new ApiError(ApiErrorType.ValidationError, "Sender and receiver same"),
    );
  }

  try {
    const rUser = await details({ _id: receiverId }, { _id: 1 });
    if (rUser.isErr) {
      if (rUser.error instanceof ApiError) {
        const err = rUser.error;
        if (err.type === ApiErrorType.NotFound) {
          return Result.err(
            new ApiError(ApiErrorType.ValidationError, "Receiver not found"),
          );
        }
        console.log(err);
      }
      return Result.err(
        new ApiError(ApiErrorType.InternalServerError, "Something went wrong"),
      );
    }

    const rUserUpdated = await UserModel.updateOne(
      { _id: receiverId },
      { $inc: { balance: amount } },
      { new: true },
    );

    if (rUserUpdated.modifiedCount === 0) {
      return Result.err(
        new ApiError(ApiErrorType.ValidationError, "Receiver not found"),
      );
    }

    const senderAmount = amount - discount;

    const user = await UserModel.updateOne(
      { _id: senderId, balance: { $gte: amount } },
      { $inc: { balance: -senderAmount } },
      { new: true },
    );

    if (user.modifiedCount === 0) {
      return Result.err(
        new ApiError(ApiErrorType.ValidationError, "Insufficient balance"),
      );
    }

    const transaction = await create({
      amount: senderAmount,
      senderId,
      receiverId,
      type: TransactionType.Debit,
      discount,
    });

    if (transaction.isErr) {
      return Result.err(transaction.error);
    }

    return Result.ok(transaction.value);
  } catch (err: any) {
    return Result.err(
      new ApiError(ApiErrorType.InternalServerError, "Something went wrong"),
    );
  }
}
