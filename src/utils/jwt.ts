import jwt from "jsonwebtoken";
import logger from "./logger";

export interface Claims {
  email: string;
  userId: string;
  sessionId: string;
}

export enum TokenType {
  AccessToken,
  RefreshToken,
}

export function signJwt(
  payload: Claims,
  tokenType: TokenType,
  options?: jwt.SignOptions | undefined,
) {
  const secret =
    tokenType === TokenType.AccessToken
      ? process.env["ACCESS_KEY_JWT_SECRET"]
      : process.env["REFRESH_KEY_JWT_SECRET"];
  if (!secret) {
    logger.error("private key is not set");
    process.exit();
  }
  return jwt.sign(payload, secret, {
    ...(options && options),
  });
}

export function verifyJwt(token: string, tokenType: TokenType) {
  const secret =
    tokenType === TokenType.AccessToken
      ? process.env["ACCESS_KEY_JWT_SECRET"]
      : process.env["REFRESH_KEY_JWT_SECRET"];
  if (!secret) {
    logger.error("private key is not set");
    process.exit();
  }
  try {
    const decoded = jwt.verify(token, secret) as Claims;
    return {
      expired: false,
      decoded,
    };
  } catch (err: any) {
    return {
      expired: err.message === "jwt expired",
      decoded: null,
    };
  }
}
