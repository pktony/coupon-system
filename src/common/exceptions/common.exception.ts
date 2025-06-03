import { HttpStatus } from "@nestjs/common";
import { BaseException } from "./base.exception";

export class CommonException extends BaseException{
  constructor(
    error: { errorCode: number, description: string },
    statusCode: HttpStatus = HttpStatus.BAD_REQUEST,
    details?: any) { 
      super(error.errorCode, error.description, statusCode, details);
  }
}