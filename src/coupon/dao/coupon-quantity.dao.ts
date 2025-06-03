import { Injectable, Inject } from "@nestjs/common";
import { CreateCouponQuantityDto } from "../dto/create-coupon-quantity.dto";
import Redis from "ioredis";

interface CouponQuantity {
  couponId: string;
  totalCount: number;
  remainingCount: number;
  createdAt: Date;
  updatedAt: Date;
}

@Injectable()
export class CouponQuantityDao {
  constructor(
    @Inject('REDIS_CLIENT')
    private readonly redis: Redis
  ) {}

  private getKey(couponId: string): string {
    return `coupon:quantity:${couponId}`;
  }

  async findOne(couponId: string): Promise<CouponQuantity | null> {
    const key = this.getKey(couponId);
    const data = await this.redis.hgetall(key);
    
    if (Object.keys(data).length === 0) {
      return null;
    }

    return {
      couponId: data.couponId,
      totalCount: parseInt(data.totalCount),
      remainingCount: parseInt(data.remainingCount),
      createdAt: new Date(data.createdAt),
      updatedAt: new Date(data.updatedAt)
    };
  }

  async findAll(couponIds: string[]): Promise<CouponQuantity[]> {
    const keys = couponIds.map(id => this.getKey(id));
    const data = await this.redis.mget(keys);
    return data
      .map(item => {
        if (!item) {
          return null;
        }
        const parsed: CouponQuantity = JSON.parse(item);
        const couponId = parsed.couponId;
        const totalCount = parseInt(parsed.totalCount.toString());
        const remainingCount = parseInt(parsed.remainingCount.toString());
        return { 
          couponId,
          totalCount,
          remainingCount,
          createdAt: new Date(parsed.createdAt),
          updatedAt: new Date(parsed.updatedAt) 
        };
      })
      .filter((item): item is CouponQuantity => item !== null);
  }

  async create(createCouponDto: CreateCouponQuantityDto): Promise<CouponQuantity> {
    const key = this.getKey(createCouponDto.couponId);
    const now = new Date();
    
    const couponQuantity: CouponQuantity = {
      couponId: createCouponDto.couponId,
      totalCount: createCouponDto.remainingCount,
      remainingCount: createCouponDto.remainingCount,
      createdAt: now,
      updatedAt: now
    };

    await this.redis.hset(key, {
      couponId: couponQuantity.couponId,
      totalCount: couponQuantity.totalCount.toString(),
      remainingCount: couponQuantity.remainingCount.toString(),
      createdAt: couponQuantity.createdAt.toISOString(),
      updatedAt: couponQuantity.updatedAt.toISOString()
    });

    return couponQuantity;
  }

  async decreaseRemainingCount(couponId: string): Promise<void> {
    const key = this.getKey(couponId);
    const updatedAt = new Date().toISOString();
    
    await this.redis.hincrby(key, 'remainingCount', -1);
    await this.redis.hset(key, 'updatedAt', updatedAt);
  }

  async getRemainingCount(couponId: string): Promise<number | null> {
    const key = this.getKey(couponId);
    const remainingCount = await this.redis.hget(key, 'remainingCount');
    
    return remainingCount ? parseInt(remainingCount) : null;
  }

  async delete(couponId: string): Promise<void> {
    const key = this.getKey(couponId);
    await this.redis.del(key);
  }
}