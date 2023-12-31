import { Result } from "@badrap/result";
import { FilterQuery } from "mongoose";
import { ApiError, ApiErrorType } from "../../../error";
import TransactionModel, {
  TransactionDocument,
} from "../../../models/transaction";

export async function details(query: FilterQuery<TransactionDocument>) {
  try {
    const transactions = await TransactionModel.find(query).lean();
    return Result.ok(transactions);
  } catch (e) {
    return Result.err(
      new ApiError(ApiErrorType.InternalServerError, "Something went wrong"),
    );
  }
}
