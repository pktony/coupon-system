import { ApiProperty } from "@nestjs/swagger";

export class CreateCouponDto {
  @ApiProperty({ description: '쿠폰 해시' })
  couponId: string;

  @ApiProperty({ description: '쿠폰 발급 개수' })
  quantity: number;

  @ApiProperty({ description: '쿠폰 발급 일자' })
  startDate: Date;

  @ApiProperty({ description: '쿠폰 만료 일자' })
  endDate: Date;
}