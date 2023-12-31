import { NextFunction, Request, Response } from "express";
import { get } from "lodash";
import { Claims, verifyJwt, reissueAccessToken, TokenType } from "../utils/jwt";

export default async (
  req: Request,
  res: Response<any, { claims: Claims }>,
  next: NextFunction,
) => {
  const accessToken = get(req, "headers.authorization", "").replace(
    /^Bearer\s/,
    "",
  );
  let refreshToken = get(req, "headers.x-refresh");
  if (refreshToken) {
    refreshToken = (refreshToken as string).replace(/^Bearer\s/, "");
  }

  if (!accessToken) {
    return next();
  }
  const { decoded, expired } = verifyJwt(accessToken, TokenType.AccessToken);
  if (decoded) {
    res.locals.claims = decoded;
    return next();
  }

  if (expired && refreshToken) {
    const newAccessToken = await reissueAccessToken({ refreshToken } as {
      refreshToken: string;
    });

    if (newAccessToken) {
      res.setHeader("x-access-token", newAccessToken);
    }

    const result = verifyJwt(newAccessToken as string, TokenType.AccessToken);
    res.locals.claims = result.decoded!;
    return next();
  }

  return next();
};
