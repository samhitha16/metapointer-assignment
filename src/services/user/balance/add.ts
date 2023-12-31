import { Result } from "@badrap/result";
import { ApiError, ApiErrorType } from "../../../error";
import UserModel from "../../../models/user";

export async function add(query: { amount: number; userId: string }) {
  const { amount, userId } = query;
  try {
    const user = await UserModel.findOneAndUpdate(
      { _id: userId },
      { $inc: { balance: amount } },
      { new: true },
    );
    if (!user) {
      new ApiError(ApiErrorType.InternalServerError, "Something went wrong");
    }
    return Result.ok(user?.balance);
  } catch (e) {
    return Result.err(
      new ApiError(ApiErrorType.InternalServerError, "Something went wrong"),
    );
  }
}
