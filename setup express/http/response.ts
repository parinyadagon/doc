import { Response } from "express";
import { AppError } from "./app.Error";

class ErrorBody {
  constructor(public message: string, public statusCode: number) {}
}

class SuccessBody {
  constructor(public message: string, public statusCode: number, public data: any) {}
}

export class HttpResponse {
  constructor() {}

  static ERROR = (res: Response, error: AppError | Error) => {
    if (error instanceof AppError) {
      return res.status(error.statusCode).json(new ErrorBody(error.message, error.statusCode));
    } else {
      return res.status(500).json(new ErrorBody(error.message, 500));
    }
  };

  static OK = (res: Response, body?: any) => {
    return res.status(200).json(new SuccessBody("OK", 200, body));
  };

  static CREATED = (res: Response, body?: any) => {
    res.status(201).json(new SuccessBody("Created", 201, body));
  };

  static INTERNAL_SERVER_ERROR = (res: Response) => {
    return res.status(500).json(new ErrorBody("Internal server error.", 500));
  };

  static BAD_REQUEST = (res: Response) => {
    return res.status(400).json(new ErrorBody("Bad request.", 400));
  };

  static NOT_FOUND = (res: Response, error: AppError) => {
    return res.status(404).json(new ErrorBody(error.message, 404));
  };

  static UNAUTHORIZED = (res: Response, error: AppError) => {
    return res.status(401).json(new ErrorBody(error.message, 401));
  };

  static FORBIDDEN = (res: Response, error: AppError) => {
    return res.status(403).json(new ErrorBody(error.message, 403));
  };

  static CONFLICT = (res: Response, error: AppError) => {
    return res.status(409).json(new ErrorBody(error.message, 409));
  };
}
