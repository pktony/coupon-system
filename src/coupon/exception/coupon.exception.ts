import { HttpException, HttpStatus } from "@nestjs/common";
import { BaseException } from "../../common/exceptions/base.exception";
import { ErrorNamespace } from "../../common/exceptions/exception.constant";

export enum CouponError {
  INVALID_COUPON = ErrorNamespace.COUPON + 0,
  DUPLICATE_COUPON = ErrorNamespace.COUPON + 1,
}

export class CouponExcepetion extends BaseException {
  constructor(
    errorCode: number,
    statusCode: HttpStatus = HttpStatus.BAD_REQUEST) { 
      super(errorCode, CouponError[errorCode], statusCode);
  }
}