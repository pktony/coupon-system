import { Module } from '@nestjs/common';
import { CouponController } from './coupon.controller';
import { CouponService } from './coupon.service';
import { CouponDao } from './dao/coupon.dao';
import { CouponQuantityDao } from './dao/coupon-quantity.dao';
import { Coupon, CouponSchema } from './schema/coupon.schema';
import { MongooseModule } from '@nestjs/mongoose';
import Redis from 'ioredis';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Coupon.name, schema: CouponSchema },
    ])
  ],
  controllers: [CouponController],
  providers: [
    CouponService, CouponDao, CouponQuantityDao,
    {
      provide: 'REDIS_CLIENT',
      useFactory: async () => {
        const redis = new Redis({
          host: process.env.REDIS_HOST || 'localhost',
          port: parseInt(process.env.REDIS_PORT || '6379'),
          password: process.env.REDIS_PASSWORD || undefined,
        });
        
        console.log('Redis connection created:', {
          host: process.env.REDIS_HOST || 'localhost',
          port: parseInt(process.env.REDIS_PORT || '6379')
        });
        
        return redis;
      }
    }
  ],
})
export class CouponModule {}