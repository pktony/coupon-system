import { ApiProperty } from "@nestjs/swagger";

export class CreateUserCouponDto {
  @ApiProperty({ description: '유저 ID' })
  userId: string;

  @ApiProperty({ description: '쿠폰 ID' })
  couponId: string;
}