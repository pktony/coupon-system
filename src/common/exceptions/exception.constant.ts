import { HttpStatus } from "@nestjs/common";

export const ErrorNamespace = {
  COMMON: 1000,
  USER: 2000,
  COUPON: 3000,
  USER_COUPON: 4000,
}

export const CommonError = {
  INVALID_PARAMETER: { errorCode: ErrorNamespace.COMMON + 1, description: 'invalid parameter', statusCode: HttpStatus.BAD_REQUEST },
}
