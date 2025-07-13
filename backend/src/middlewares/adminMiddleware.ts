import { Request, Response, NextFunction } from "express";
import logger from "../utils/logger";

/**
 * Middleware to check if the user has admin role
 */
export const adminMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Check if user exists and has admin role
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized: Authentication required" });
  }
  logger.info(`User ${JSON.stringify(req.user,null,2)}`)
  if (req.user.role !== "ADMIN") {
    logger.warn(`User ${req.user.id} attempted to access admin-only endpoint`);
    return res.status(403).json({ message: "Forbidden: Admin access required" });
  }

  // User is an admin, proceed
  next();
};
