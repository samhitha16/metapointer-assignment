import mongoose from "mongoose";
import { UserDocument } from "./user";

export interface SessionDocument extends mongoose.Document {
  userId: UserDocument["_id"];
  valid: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const sessionSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    valid: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  },
);

const SessionModel = mongoose.model<SessionDocument>("Session", sessionSchema);

export interface SessionInput {
  userId: string;
  valid: boolean;
}

export default SessionModel;
