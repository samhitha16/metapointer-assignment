import { Result } from "@badrap/result";
import UserModel, { UserInput } from "../../models/user";
import { omit } from "lodash";
import mongoose from "mongoose";
import { ApiError, ApiErrorType } from "../../error";
import { User } from ".";

export async function create(input: UserInput): Promise<User> {
  try {
    const user = await UserModel.create(input);
    return Result.ok(omit(user.toJSON(), "password"));
  } catch (err: any) {
    if (err instanceof mongoose.mongo.MongoServerError) {
      if (err.code === 11000) {
        return Result.err(
          new ApiError(
            ApiErrorType.EntityAlreadyExist,
            `user with email:${input.email} already exists`,
          ),
        );
      }
    }
    return Result.err(
      new ApiError(ApiErrorType.InternalServerError, "Something went wrong"),
    );
  }
}
