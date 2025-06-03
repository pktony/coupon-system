import { ApiProperty } from "@nestjs/swagger";

export class UserCouponDto {
  @ApiProperty({ description: '유저 ID' })
  userId: string;

  @ApiProperty({ description: '쿠폰 ID' })
  couponId: string;

  @ApiProperty({ description: '발급 ID' })
  issueId: string;

  @ApiProperty({ description: '사용 여부' })
  isUsed: boolean;
}