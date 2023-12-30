import { Result } from "@badrap/result";
import { UserDocument } from "../../models/user";

export type User = Result<Omit<UserDocument, "password">>;
