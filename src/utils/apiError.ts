export interface ApiErrorType {
  statusCode: number;
  message: any;
}

export class ApiError extends Error implements ApiErrorType {
  statusCode: number;

  constructor(message: string, statusCode: number = 400) {
    super(message);
    this.statusCode = statusCode;
    this.message = message;
  }
}
