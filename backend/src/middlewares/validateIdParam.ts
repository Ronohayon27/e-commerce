import { Request, Response, NextFunction } from "express";
import logger from "src/utils/logger";
import { z } from "zod";

export const validateIdParam = (paramName: string) => {
  const schema = z.uuid();

  return (req: Request, res: Response, next: NextFunction) => {
    const value = req.params[paramName];
    const result = schema.safeParse(value);
    logger.info(`Validating ${paramName} param with value ${value}`);
    if (!result.success) {
      // TODO: add custom errors with middlewares
      return res.status(400).json({ error: result.error.message });
    }
    next();
  };
};
