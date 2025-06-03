import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { UserCoupon, UserCouponDocument } from "../entity/user-coupon.schema";
import { Model } from "mongoose";
import { UserCouponDto } from "../dto/user-coupon.dto";
import { CreateUserCouponDto } from "../dto/create-user-coupon.dto";

@Injectable()
export class UserCouponDao {
  constructor(
    @InjectModel(UserCoupon.name)
    private readonly userCouponModel: Model<UserCoupon>
  ) { }

  async create(createUserCouponDto: CreateUserCouponDto) : Promise<UserCouponDto> {
    const userCoupon = await this.userCouponModel.create({
      ...createUserCouponDto,
    });
    return this.toUserCouponDto(userCoupon);
  }

  async getUserCoupons(userId: string) : Promise<UserCouponDto[]> {
    const userCoupons = await this.userCouponModel.find({ userId }).exec();
    return userCoupons.map(this.toUserCouponDto);
  }

  private toUserCouponDto(userCoupon: UserCouponDocument): UserCouponDto {
    const { _id, ...userCouponObject } = userCoupon.toObject();
    return {
      issueId: _id.toString(),
      ...userCouponObject
    };
  }
}