import { Module } from '@nestjs/common';
import { UserCouponController } from './user-coupon.controller';
import { UserCouponService } from './user-coupon.service';

@Module({
  imports: [],
  controllers: [UserCouponController],
  providers: [UserCouponService],
})
export class UserCouponModule {}