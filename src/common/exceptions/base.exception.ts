import { HttpException, HttpStatus } from "@nestjs/common";

export class BaseException extends HttpException {
  constructor(
    private readonly errorCode: number,
    private readonly errorMessage: string,
    statusCode: HttpStatus = HttpStatus.BAD_REQUEST,
    details?: any
  ) {
    super(
      {
        error: {
          message: errorMessage,
          code: errorCode,
          details
        }
      },
      statusCode,
    )
  }
}