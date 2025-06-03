import { Body, Controller, Get, HttpCode, HttpStatus, Post, Query } from "@nestjs/common";
import { FindAllCouponDto } from "./dto/findall-coupon.dto";
import { FindCouponDto } from "./dto/find-coupon.dto";
import { CouponService } from "./coupon.service";
import { CreateCouponDto } from "./dto/create-coupon.dto";
import { CouponDto } from "./dto/coupon.dto";
import { ApiOperation } from "@nestjs/swagger";

@Controller('coupons')
export class CouponController {
  constructor(
    private readonly couponService: CouponService
  ) { }

  @Get(":id")
  @ApiOperation({ summary: '쿠폰 조회' })
  getCoupon(@Query() findCouponDto: FindCouponDto): Promise<CouponDto> {
    return this.couponService.getCoupon(findCouponDto);
  }

  @Get()
  @ApiOperation({ summary: '쿠폰 목록 조회' })
  getAllCoupons(@Query() findCouponDto: FindAllCouponDto): Promise<CouponDto[]> {
    return this.couponService.getAllCoupons(findCouponDto);
  }

  @Post()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: '쿠폰 생성' })
  createCoupon(@Body() createCouponDto: CreateCouponDto): Promise<CouponDto> {
    return this.couponService.createCoupon(createCouponDto);
  }
}