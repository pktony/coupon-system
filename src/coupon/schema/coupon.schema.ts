import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type CouponDocument = Coupon & Document;

@Schema()
export class Coupon {
  @Prop({ required: true, unique: true, index: true })
  couponId: string;

  @Prop({ required: true })
  startDate: Date;

  @Prop({ required: true })
  endDate: Date; 

  @Prop({ required: true })
  quantity: number;
}

export const CouponSchema = SchemaFactory.createForClass(Coupon);