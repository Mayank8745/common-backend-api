import { Response } from "express";

export const StatusCode = {
  SUCCESS: 10000,
  FAILURE: 10001,
  URI_NOT_FOUND: 10002,
  UNAUTHORIZED: 10003,
  AUTHENTICATION_FAILED: 20000,
  REDIRECT_URI_INVALID: 20003,
  INVALID_REFRESH_TOKEN: 20006,
};

export const ResponseCode = {
  SUCCESS: 200,
  CREATED: 201,
  ACCEPTED: 202,
  PARTIAL_CONTENT: 206,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  REQUEST_TIMEOUT: 408,
  PAYLOAD_TO_LARGE: 413,
  UNSUPPORTED_MEDIA_TYPE: 415,
  TOO_MANY_REQUEST: 429,
  INTERNAL_SERVER_ERROR: 500,
  NOT_IMPLEMENTED: 501,
};

export const successResponse = (res: Response, message: String, data: any) => {
  return res
    .status(ResponseCode.SUCCESS)
    .json({ status: StatusCode.SUCCESS, message, data });
};

export const successCreatedResponse = (
  res: Response,
  message: String,
  data: any
) => {
  return res
    .status(ResponseCode.CREATED)
    .json({ status: StatusCode.SUCCESS, message, data });
};

export const notFoundResponse = (res: Response, errors = [{}]) => {
  return res
    .status(ResponseCode.NOT_FOUND)
    .json({ status: StatusCode.FAILURE, errors });
};

export const badRequestResponse = (
  res: Response,
  errors = [{ message: "Bad Parameters" }]
) => {
  return res
    .status(ResponseCode.BAD_REQUEST)
    .json({ status: StatusCode.FAILURE, errors });
};
