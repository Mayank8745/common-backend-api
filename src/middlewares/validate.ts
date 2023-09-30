import { ObjectSchema } from "joi";
import { Request, Response, NextFunction } from "express";
import { logger } from "../helpers/logger";
import { BadRequestError } from "../errors";

export enum ValidationSource {
  BODY = "body",
  PARAM = "params",
  HEADER = "headers",
  QUERY = "query",
}

export const validator =
  (schema: ObjectSchema, source: ValidationSource = ValidationSource.BODY) =>
    (req: Request, _res: Response, next: NextFunction) => {
      try {
        const { error } = schema.validate(source);
        if (!error) return next();
        logger.error(error);

        const { details } = error;
        const message = details
          .map((i) => i.message.replace(/['"]+/g, ""))
          .join(",");
        logger.info(message);

        return next(new BadRequestError(message));
      } catch (error) {
        return next(error);
      }
    };
