import { FilterQuery } from "mongoose";
import SessionModel, { SessionDocument } from "../../models/session";
import { Result } from "@badrap/result";
import { ApiError, ApiErrorType } from "../../error";

// soft delete by setting valid to false
export async function Delete(
  query: FilterQuery<SessionDocument>,
): Promise<Result<void>> {
  try {
    const querySession = SessionModel.where(query);
    const session = await querySession.findOneAndUpdate({
      valid: false,
    });
    if (!session) {
      return Result.err(
        new ApiError(ApiErrorType.NotFound, "Session not found"),
      );
    }
    return Result.ok(undefined);
  } catch (err) {
    return Result.err(
      new ApiError(ApiErrorType.InternalServerError, "Something went wrong"),
    );
  }
}
