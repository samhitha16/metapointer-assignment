export enum ApiErrorType {
  EntityAlreadyExist,
  NotFound,
  InternalServerError,
  ValidationError,
}

export class ApiError extends Error {
  type: ApiErrorType;
  override message: string;

  constructor(error: ApiErrorType, message: string) {
    super(message);
    this.type = error;
    this.message = message;
  }
}
