import { Result } from "@badrap/result";
import { UserDocument } from "../../models/user";
import { create } from "./create";
import { details } from "./details";

export type User = Result<Omit<UserDocument, "password">>;

export { create, details };
