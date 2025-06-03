import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type UserCouponDocument = UserCoupon & Document;

@Schema()
export class UserCoupon {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  couponId: string;

  @Prop({ required: true, default: false })
  isUsed: boolean;
}

export const UserCouponSchema = SchemaFactory.createForClass(UserCoupon);