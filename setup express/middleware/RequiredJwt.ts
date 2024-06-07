import { NextFunction, Request, Response } from "express";
import { JWT } from "../utils/jwt";
import { JwtPayload } from "jsonwebtoken";
import logger from "../http/logger";
import { PayloadToken } from "@/dtos/login/auth";

declare global {
  namespace Express {
    interface Request {
      user: PayloadToken;
    }
  }
}

export default async function (req: Request, res: Response, next: NextFunction) {
  try {
    const authorize = req.headers.authorization;
    if (!authorize) {
      return res.sendStatus(401);
    }

    // const token = authorize && authorize.split(" ")[1];

    const decoded = JWT.verifyToken(authorize) as PayloadToken;
    if (!decoded) {
      return res.sendStatus(401);
    }

    const user: PayloadToken = { username: decoded.username, id: decoded.id, role: decoded.role };

    req.user = user;
    next();
  } catch (error) {
    logger.error("Verify token failure: ", error);
    return res.sendStatus(401);
  }
}
