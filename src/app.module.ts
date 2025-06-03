import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CouponModule } from '@coupon/coupon.module';
import { UserModule } from '@user/user.module';
import { UserCouponModule } from '@user-coupon/user-coupon.module';
import { CustomExceptionFilter } from './common/exceptions/custom-exception.filter';
import { ResponseInterceptor } from './common/interceptors/custom-response.interceptor';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';

@Module({
  imports: [
    CouponModule,
    UserModule,
    UserCouponModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_FILTER,
      useClass: CustomExceptionFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    }
  ],
})
export class AppModule {}
