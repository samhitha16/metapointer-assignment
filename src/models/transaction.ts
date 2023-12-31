import mongoose from "mongoose";
import { UserDocument } from "./user";

export enum TransactionType {
  Credit = "credit",
  Debit = "debit",
}

export interface TransactionDocument extends mongoose.Document {
  senderId: UserDocument["_id"];
  receiverId: UserDocument["_id"];
  type: TransactionType;
  amount: number;
  discount?: number;
  createdAt: Date;
  updatedAt: Date;
}

const transactionSchema = new mongoose.Schema(
  {
    senderId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    receiverId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    amount: { type: Number, required: true },
    discount: { type: Number, default: 0 },
    type: {
      type: String,
      enum: Object.values(TransactionType),
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const TransactionModel = mongoose.model<TransactionDocument>(
  "Transaction",
  transactionSchema,
);

export interface TransactionInput {
  senderId: string;
  receiverId: string;
  amount: number;
  type: TransactionType;
  discount?: number;
}

export default TransactionModel;
