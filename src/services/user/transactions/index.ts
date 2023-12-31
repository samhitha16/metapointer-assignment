import { Result } from "@badrap/result";
import { TransactionDocument } from "src/models/transaction";

export type Transaction = Result<TransactionDocument>;
