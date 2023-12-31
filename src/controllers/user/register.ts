import { Request, Response } from "express";
import { CreateUserSchema } from "../../schemas/user";
import { create } from "../../services/user";
import { ApiError, ApiErrorType } from "../../error";

export async function register(
  req: Request<{}, {}, CreateUserSchema["body"]>,
  res: Response,
) {
  const data = req.body;
  const userResult = await create(data);
  if (userResult.isOk) {
    return res.status(201).send(userResult.value);
  } else {
    const e = userResult.error;
    if (e instanceof ApiError) {
      if (e.type === ApiErrorType.EntityAlreadyExist) {
        return res.status(409).send({ message: e.message });
      }
    }
    return res.status(500).send({ message: "Something went wrong" });
  }
}
