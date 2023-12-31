import { FilterQuery } from "mongoose";
import { Session } from ".";
import SessionModel, { SessionDocument } from "../../models/session";
import { Result } from "@badrap/result";
import { ApiError, ApiErrorType } from "../../error";

export async function details(
  query: FilterQuery<SessionDocument>,
): Promise<Session> {
  try {
    const queryResult = SessionModel.where(query);
    const session = await queryResult.findOne().lean();
    if (!session) {
      return Result.err(
        new ApiError(ApiErrorType.NotFound, "Session not found"),
      );
    }
    return Result.ok(session);
  } catch (e) {
    return Result.err(
      new ApiError(ApiErrorType.InternalServerError, "Something went wrong"),
    );
  }
}
