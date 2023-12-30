import { Result } from "@badrap/result";
import { SessionDocument } from "../../models/session";
import { create } from "./create";

export type Session = Result<SessionDocument>;

export { create };
