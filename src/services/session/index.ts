import { Result } from "@badrap/result";
import { SessionDocument } from "../../models/session";
import { create } from "./create";
import { details } from "./details";
import { Delete } from "./delete";

export type Session = Result<SessionDocument>;

export { create, details, Delete };
