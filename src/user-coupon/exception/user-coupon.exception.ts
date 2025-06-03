import { HttpException, HttpStatus } from "@nestjs/common";
import { BaseException } from "../../common/exceptions/base.exception";
import { ErrorNamespace } from "../../common/exceptions/exception.constant";

export enum UserCouponError {
  INVALID_COUPON = ErrorNamespace.USER_COUPON + 0,
  COUPON_EXPIRED = ErrorNamespace.USER_COUPON + 1,
  NO_COUPON_REMAINING = ErrorNamespace.USER_COUPON + 2,
}

export class UserCouponExcepetion extends BaseException {
  constructor(
    errorCode: number,
    statusCode: HttpStatus = HttpStatus.BAD_REQUEST) { 
      super(errorCode, UserCouponError[errorCode], statusCode);
  }
}