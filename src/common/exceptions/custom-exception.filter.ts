// common/custom-exception.filter.ts
import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';
import { ResponseDto } from '../dto/response.dto';

// @Catch(HttpException, BaseException)
@Catch()
export class CustomExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception instanceof HttpException ? exception.getStatus() : 500;


    const exceptionResponse: any =
      exception instanceof HttpException
        ? exception.getResponse()
        : { message: exception.message || 'Internal Server Error' };

    const { error } = typeof exceptionResponse === 'string'
      ? { error : { message : exceptionResponse} }
      : exceptionResponse


    const errorResponse: ResponseDto<null> = {
      error: {
        statusSubCode: error?.code || exceptionResponse.code || status,
        message: error?.message || exceptionResponse.message || 'An error occurred',
        details: error?.details || exceptionResponse.details || null,
      },
      serverTime: Date.now(),
    };

    response.status(status).json(errorResponse);
  }
}
