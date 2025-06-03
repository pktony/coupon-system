import { Body, Controller, Get, Param, Post, Query } from "@nestjs/common";
import { UserCouponService } from "./user-coupon.service";
import { CreateUserCouponDto } from "./dto/create-user-coupon.dto";

@Controller('user-coupons')
export class UserCouponController {
  constructor(
    private readonly userCouponService: UserCouponService
  ) {}

  @Post()
  async issueCoupon(@Body() createUserCouponDto: CreateUserCouponDto) {
    return this.userCouponService.issueCoupon(createUserCouponDto);
  }

  @Get(':userId')
  async getUserCoupons(@Param('userId') userId: string) {
    return this.userCouponService.getUserCoupons(userId);
  }
}
