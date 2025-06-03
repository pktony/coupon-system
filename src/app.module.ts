import * as dotenv from 'dotenv';
import { Module } from '@nestjs/common';
import { CouponModule } from '@coupon/coupon.module';
import { UserModule } from '@user/user.module';
import { UserCouponModule } from '@user-coupon/user-coupon.module';
import { CustomExceptionFilter } from './common/exceptions/custom-exception.filter';
import { ResponseInterceptor } from './common/interceptors/custom-response.interceptor';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LogModule } from './log/log.module';

// .env 파일을 프로젝트 루트에서 로드
dotenv.config({ path: '.env' });

console.log('MONGO_DB:', process.env.MONGO_DB);
console.log('REDIS_DB:', process.env.REDIS_DB);

@Module({
  imports: [
    CouponModule,
    UserModule,
    UserCouponModule,
    MongooseModule.forRoot(process.env.MONGO_DB!),
    LogModule,
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
    },
    AppService
  ],
})
export class AppModule {}
