import jwt from "jsonwebtoken";
import logger from "./logger";
import { details } from "../services/session/details";
import UserModel from "../models/user";

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

export async function reissueAccessToken({
  refreshToken,
}: {
  refreshToken: string;
}) {
  const { decoded, expired } = verifyJwt(refreshToken, TokenType.RefreshToken);
  if (expired || !decoded) {
    return false;
  }

  const sessionResult = await details({ _id: decoded.sessionId });

  if (sessionResult.isErr) return false;
  let session = sessionResult.value;
  if (!session.valid) return false;

  const user = await UserModel.findById(decoded.userId);
  if (!user) return false;

  const accessTokenTtl = process.env["ACCESSTOKENTTL"] || "15m";
  const newAccessToken = signJwt(
    { userId: user._id, email: user.email, sessionId: session._id },
    TokenType.AccessToken,
    { expiresIn: accessTokenTtl },
  );

  return newAccessToken;
}
