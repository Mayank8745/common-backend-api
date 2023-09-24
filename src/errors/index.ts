import { Response } from "express";

import { badRequestResponse } from "../responses";

enum ErrorType {
  BAD_REQUEST = "BadRequestError",
}

export class ApiError extends Error {
  constructor(public type: ErrorType, public message: string) {
    super(message);
    this.type = type;
    this.name = "API_ERROR";
  }

  static handle(err: any, res: Response) {
    switch (err.type) {
      case ErrorType.BAD_REQUEST:
        return badRequestResponse(res, err.serializeErrors());
    }
  }
}

export class BadRequestError extends ApiError {
  constructor(message = "Bad Parameters") {
    super(ErrorType.BAD_REQUEST, message);
  }

  serializeErrors() {
    return [{ message: this.message }];
  }
}
