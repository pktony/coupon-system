import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Coupon, CouponDocument } from "../schema/coupon.schema";
import { Model } from "mongoose";
import { CreateCouponDto } from "../dto/create-coupon.dto";
import { FindAllCouponDto } from "../dto/findall-coupon.dto";
import { CouponDto } from "../dto/coupon.dto";

@Injectable()
export class CouponDao {
  constructor(
    @InjectModel(Coupon.name)
    private readonly couponModel: Model<Coupon>
  ) { }

  async findOne(couponId: string): Promise<CouponDto | null> {
    const coupon = await this.couponModel.findOne({ couponId }).exec();
    return coupon ? this.toCouponDto(coupon) : null;
  }

  async create(createCouponDto: CreateCouponDto): Promise<CouponDto> {
    const coupon = await this.couponModel.create(createCouponDto);
    return this.toCouponDto(coupon);
  }

  async findAll(findCouponDto: FindAllCouponDto): Promise<CouponDto[]> {
    const coupons = await this.couponModel.find(findCouponDto).exec();
    return coupons.map(coupon => this.toCouponDto(coupon));
  }

  private toCouponDto(coupon: CouponDocument): CouponDto {
    const { __v, _id, ...couponDto } = coupon.toObject();

    return couponDto;
  }
}