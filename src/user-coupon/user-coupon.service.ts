import { Injectable } from "@nestjs/common";
import { CreateUserCouponDto } from "./dto/create-user-coupon.dto";
import { UserCouponDao } from "./dao/user-coupon.dao";
import { UserCouponDto } from "./dto/user-coupon.dto";
import { CouponService } from "../coupon/coupon.service";

@Injectable()
export class UserCouponService {
  constructor(
    private readonly userCouponDao: UserCouponDao,
    private readonly couponService: CouponService,
  ) {}

  getUserCoupons(userId: string) : Promise<UserCouponDto[]> {
    return this.userCouponDao.getUserCoupons(userId);
  }

  async issueCoupon(createUserCouponDto: CreateUserCouponDto) : Promise<UserCouponDto> {
    await this.couponService.issueCoupon(createUserCouponDto);

    return this.userCouponDao.create(createUserCouponDto);
  }
}