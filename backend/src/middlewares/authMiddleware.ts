import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { UserTokenPayload } from "src/types/authTypes";

declare global {
  namespace Express {
    interface Request {
      user?: UserTokenPayload;
    }
  }
}

const JWT_SECRET = process.env.JWT_SECRET!;

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as UserTokenPayload;
    req.user = decoded;
    next();
  } catch {
    return res
      .status(403)
      .json({ message: "Forbidden: Invalid or expired token" });
  }
};
