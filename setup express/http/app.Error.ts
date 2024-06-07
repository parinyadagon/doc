export class AppError extends Error {
    constructor(message: string, public statusCode: number) {
      super(message);
      this.name = "AppError";
      this.statusCode = statusCode;
      Object.setPrototypeOf(this, AppError.prototype);
    }
  }
  
  class InternalServerError extends AppError {
    constructor(public message: string) {
      super(message, 500);
      this.statusCode = 500;
      this.name = "InternalServerError";
    }
  }
  class BadRequestError extends AppError {
    constructor(message: string) {
      super(message, 400);
      this.statusCode = 400;
      this.name = "BadRequestError";
    }
  }
  class NotFoundError extends AppError {
    constructor(message: string) {
      super(message, 404);
      this.name = "NotFoundError";
      this.statusCode = 404;
    }
  }
  class UnauthorizedError extends AppError {
    constructor(message: string) {
      super(message, 401);
      this.name = "UnauthorizedError";
      this.statusCode = 401;
    }
  }
  class ForbiddenError extends AppError {
    constructor(message: string) {
      super(message, 403);
      this.name = "ForbiddenError";
      this.statusCode = 403;
    }
  }
  
  export default { InternalServerError, BadRequestError, NotFoundError, UnauthorizedError, ForbiddenError };
  