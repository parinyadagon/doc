import { Role } from "@/dtos/employee/employee";
import { NextFunction, Request, Response } from "express";
import logger from "../http/logger";

export default function (...allowedRoles: Role[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.user.role) return res.sendStatus(403);
      const rolesArray = [...allowedRoles];
      const result = rolesArray.some((role) => role === req.user.role);
      if (!result) return res.sendStatus(403);

      next();
    } catch (error) {
      logger.error("Access denied");
      return res.sendStatus(403);
    }
  };
}
