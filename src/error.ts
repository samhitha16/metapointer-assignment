export enum ApiErrorType {
  EntityAlreadyExist,
  NotFound,
  InternalServerError,
  ValidationError,
}

export class ApiError extends Error {
  error: ApiErrorType;
  override message: string;

  constructor(error: ApiErrorType, message: string) {
    super(message);
    this.error = error;
    this.message = message;
  }
}
