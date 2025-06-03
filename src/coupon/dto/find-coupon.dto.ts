import { ApiProperty } from "@nestjs/swagger";

export class FindCouponDto {
  @ApiProperty({ description: '쿠폰 해시' })
  couponId: string;
}