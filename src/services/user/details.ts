import UserModel, { UserDocument } from "../../models/user";
import { FilterQuery } from "mongoose";
import { Result } from "@badrap/result";
import { ApiError, ApiErrorType } from "../../error";

export type Select = {
  [K in keyof UserDocument]?: 1;
};

export async function details(
  query: FilterQuery<UserDocument>,
  select: Select,
) {
  try {
    const user = await UserModel.findOne(query).select(select).lean();
    if (!user) {
      return Result.err(new ApiError(ApiErrorType.NotFound, "User not found"));
    }
    console.log(user);
    return Result.ok(user);
  } catch (err: any) {
    if (err.name === "CastError") {
      return Result.err(new ApiError(ApiErrorType.NotFound, "User not found"));
    }
    return Result.err(
      new ApiError(ApiErrorType.InternalServerError, "Something went wrong"),
    );
  }
}
