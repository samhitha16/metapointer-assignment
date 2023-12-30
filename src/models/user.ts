import mongoose from "mongoose";
import argon2 from "argon2";

const userSchema = new mongoose.Schema<UserDocument>(
  {
    email: { type: String, unique: true, required: true },
    name: { type: String, required: true },
    password: { type: String, required: true },
    balance: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  },
);

userSchema.pre("save", async function(next) {
  let user = this as UserDocument;
  if (!user.isModified("password")) {
    return next();
  }
  const hash = await argon2.hash(user.password, {});
  user.password = hash;
  return next();
});

const UserModel: mongoose.Model<UserDocument> = mongoose.model(
  "User",
  userSchema,
);

export interface UserInput {
  email: string;
  name: string;
  password: string;
}

export interface UserDocument extends UserInput, mongoose.Document {
  balance: number;
  createdAt: Date;
  updatedAt: Date;
}

export default UserModel;
