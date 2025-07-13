import { Request, Response, NextFunction } from "express";
import logger from "src/utils/logger";
import { z } from "zod";

export const validateIdParam = (paramName: string) => {
  const schema = z.uuid();

  return (req: Request, res: Response, next: NextFunction) => {
    const value = req.params[paramName];
    if (!value) {
      return res.status(400).json({
        error: `Missing required parameter: ${paramName}`,
      });
    }
    const result = schema.safeParse(value);
    logger.info(`Validating ${paramName} param with value ${value}`);
    if (!result.success) {
      // TODO: add custom errors with middlewares
      return res.status(400).json({ error: result.error.message });
    }
    next();
  };
};

export const validateRequest = (schema: z.ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      logger.info("validateRequest fails ")
      const errors = result.error.flatten();
      return res.status(400).json({ errors });
    }

    req.body = result.data; // safely parsed & typed
    next();
  };
};
