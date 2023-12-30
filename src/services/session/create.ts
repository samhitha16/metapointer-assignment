import { Result } from "@badrap/result";
import { Session } from ".";
import SessionModel, { SessionInput } from "../../models/session";
import { ApiError, ApiErrorType } from "../../error";

export async function create({
  valid,
  userId,
}: SessionInput): Promise<Session> {
  try {
    const session = await SessionModel.create({ valid, userId });
    return Result.ok(session);
  } catch (e) {
    return Result.err(
      new ApiError(ApiErrorType.InternalServerError, "Something went wrong"),
    );
  }
}
