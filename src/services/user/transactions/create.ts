import { Result } from "@badrap/result";
import TransactionModel, {
  TransactionInput,
} from "../../../models/transaction";
import { ApiError, ApiErrorType } from "../../../error";

export async function create(input: TransactionInput) {
  try {
    const transaction = await TransactionModel.create(input);
    return Result.ok(transaction);
  } catch (e) {
    return Result.err(
      new ApiError(ApiErrorType.InternalServerError, "Something went wrong"),
    );
  }
}
