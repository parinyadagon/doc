import jwt from "jsonwebtoken";
import { jwtConfig } from "@/shared/utils/config";
import { PayloadToken } from "@/dtos/login/auth";

export class JWT {
  static jwtSecretKey: string = jwtConfig.secretKey;
  static jwtExpiresIn: string = jwtConfig.expiresIn;

  public static generateToken(payload: PayloadToken, rememberMe: boolean) {
    const expiresIn = rememberMe ? expiresInToUnix("90d") : expiresInToUnix(this.jwtExpiresIn);
    const token = jwt.sign({ ...payload }, this.jwtSecretKey, {
      expiresIn,
    });

    return { token, expiresIn };
  }

  public static verifyToken(token: string) {
    token = token.split(" ")[1];
    return jwt.verify(token, this.jwtSecretKey);
  }
}

export function expiresInToUnix(expiresIn: string): number {
  const durationRegex = /(\d+)([smhdwMy]|mo|yrs?)/;
  const matches = expiresIn.match(durationRegex);

  if (!matches) {
    throw new Error("Invalid expiresIn format");
  }

  const value = parseInt(matches[1]);
  const unit = matches[2];

  let multiplier: number;
  switch (unit) {
    case "s":
      multiplier = 1;
      break;
    case "m":
      multiplier = 60;
      break;
    case "h":
      multiplier = 60 * 60;
      break;
    case "d":
      multiplier = 60 * 60 * 24;
      break;
    case "w":
      multiplier = 60 * 60 * 24 * 7;
      break;
    case "M":
      multiplier = 60 * 60 * 24 * 30;
      break;
    case "y":
      multiplier = 60 * 60 * 24 * 365;
      break;
    default:
      throw new Error("Invalid unit");
  }

  const nowSeconds = Math.floor(Date.now() / 1000);
  const expirationDateSeconds = nowSeconds + value * multiplier;

  return expirationDateSeconds;
}
