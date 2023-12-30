import UserModel, { UserDocument } from "../../models/user";
import { FilterQuery } from "mongoose";
import { Result } from "@badrap/result";
import { ApiError, ApiErrorType } from "../../error";

export async function details(
  select: FilterQuery<UserDocument>,
): Promise<Result<UserDocument>> {
  try {
    const user = await UserModel.findOne(select).lean();
    if (!user) {
      return Result.err(new ApiError(ApiErrorType.NotFound, "User not found"));
    }
    return Result.ok(user);
  } catch (err) {
    return Result.err(
      new ApiError(ApiErrorType.InternalServerError, "Something went wrong"),
    );
  }
}
