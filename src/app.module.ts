import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CouponModule } from '@coupon/coupon.module';
import { UserModule } from '@user/user.module';
import { UserCouponModule } from '@user-coupon/user-coupon.module';

@Module({
  imports: [
    CouponModule,
    UserModule,
    UserCouponModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
