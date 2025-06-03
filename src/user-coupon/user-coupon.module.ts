import { Module } from '@nestjs/common';
import { UserCouponController } from './user-coupon.controller';
import { UserCouponService } from './user-coupon.service';
import { UserCouponDao } from './dao/user-coupon.dao';
import { MongooseModule } from '@nestjs/mongoose';
import { UserCoupon, UserCouponSchema } from './entity/user-coupon.schema';
import { CouponModule } from '../coupon/coupon.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: UserCoupon.name, schema: UserCouponSchema }]),
    CouponModule
  ],
  controllers: [UserCouponController],
  providers: [UserCouponService, UserCouponDao],
})
export class UserCouponModule {}