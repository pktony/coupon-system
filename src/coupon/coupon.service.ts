import { Injectable } from "@nestjs/common";
import { CouponDao } from "./dao/coupon.dao";
import { CouponQuantityDao } from "./dao/coupon-quantity.dao";
import { FindCouponDto } from "./dto/find-coupon.dto";
import { FindAllCouponDto } from "./dto/findall-coupon.dto";
import { CreateCouponDto } from "./dto/create-coupon.dto";
import { CouponError, CouponExcepetion } from "./exception/coupon.exception";
import { CreateCouponQuantityDto } from "./dto/create-coupon-quantity.dto";
import { CouponDto } from "./dto/coupon.dto";

@Injectable()
export class CouponService {
  constructor(
    private readonly couponDao: CouponDao,
    private readonly couponQuantityDao: CouponQuantityDao
  ) { }

  async getCoupon(findCouponDto: FindCouponDto) : Promise<CouponDto> {
    const coupon = await this.couponDao.findOne(findCouponDto.couponId);
    if (!coupon) {
      throw new CouponExcepetion(CouponError.INVALID_COUPON);
    }

    const couponRemainCount = await this.couponQuantityDao.findOne(findCouponDto.couponId);
    if (!couponRemainCount) {
      throw new CouponExcepetion(CouponError.INVALID_COUPON);
    }
    coupon.remainingCount = couponRemainCount.remainingCount;

    return coupon;
  }

  async getAllCoupons(findAllCouponDto: FindAllCouponDto) : Promise<CouponDto[]> {
    const coupons = await this.couponDao.findAll(findAllCouponDto);
    const couponIds = coupons.map(coupon => coupon.couponId);
    
    const couponQuantities = await this.couponQuantityDao.findAll(couponIds);
    return coupons.map(coupon => {
      const couponQuantity = couponQuantities.find(quantity => quantity.couponId === coupon.couponId);
      return { ...coupon, remainingCount: couponQuantity?.remainingCount || 0 };
    });
    
  }

  async createCoupon(createCouponDto: CreateCouponDto) : Promise<CouponDto>{
    const couponQuantity = await this.couponDao.findOne(createCouponDto.couponId);

    if (couponQuantity) {
      throw new CouponExcepetion(CouponError.DUPLICATE_COUPON);
    }

    //TODO: add transaction
    const coupon = await this.couponDao.create(createCouponDto);
    const { quantity, ...couponDto } = createCouponDto;
    const couponQuantityDto: CreateCouponQuantityDto = {
      ...couponDto,
      remainingCount: quantity
    }
    await this.couponQuantityDao.create(couponQuantityDto);
    //TODO: add transaction

    return coupon;
  }
}