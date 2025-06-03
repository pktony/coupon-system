import { Test, TestingModule } from "@nestjs/testing";
import { CouponController } from "./coupon.controller";
import { CouponService } from "./coupon.service";
import { CouponDto } from "./dto/coupon.dto";
import { CouponError, CouponExcepetion } from "./exception/coupon.exception";
import { FindCouponDto } from "./dto/find-coupon.dto";
import { CreateCouponDto } from "./dto/create-coupon.dto";

describe('CouponController', () => {
  let controller: CouponController;
  let service: CouponService;

	const mockCouponService = {
		createCoupon: jest.fn(),
		getCoupon: jest.fn(),
		getAllCoupons: jest.fn(),
	}

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CouponController],
      providers: [
        {
          provide: CouponService,
          useValue: {
            useValue: mockCouponService
          }
        }
      ]
    }).compile();

    controller = module.get<CouponController>(CouponController)
    service = module.get<CouponService>(CouponService)
  });

	const mockCoupon : CouponDto = {
		couponId: 'WELCOME',
		startDate: new Date(),
		endDate: new Date(2050, 12, 31),
		remainingCount: 100,
	}

  describe('GET /coupons/:id 쿠폰 목록 조회', () => {
    it('쿠폰 목록 조회 성공', async () => {
			service.getCoupon = jest.fn().mockResolvedValue(mockCoupon);
      expect(await controller.getCoupon(mockCoupon)).toBe(mockCoupon);
    });

    it('쿠폰 목록이 없을 때 실패', async () => {
			const invalidCoupon : FindCouponDto = {
				couponId: 'INVALID',
			}
			service.getCoupon = jest.fn().mockRejectedValue(new CouponExcepetion(CouponError.INVALID_COUPON));

			await expect(controller.getCoupon(invalidCoupon))
			  .rejects.toThrow(CouponExcepetion);
			expect(service.getCoupon).toHaveBeenCalledWith(invalidCoupon);
    });
  })

  describe('POST /coupons/:id 쿠폰 생성', () => {
		const createCouponDto : CreateCouponDto = {
			...mockCoupon,
			quantity: 100,
		}

    it('쿠폰 생성 성공', async () => {
      service.createCoupon = jest.fn().mockResolvedValue(mockCoupon);
      expect(await controller.createCoupon(createCouponDto)).toBe(mockCoupon);
			expect(service.createCoupon).toHaveBeenCalledWith(createCouponDto);
    });

    it('쿠폰 생성 실패', async () => {
      service.createCoupon = jest.fn().mockRejectedValue(new CouponExcepetion(CouponError.DUPLICATE_COUPON));
      await expect(controller.createCoupon(createCouponDto))
        .rejects.toThrow(CouponExcepetion);
      expect(service.createCoupon).toHaveBeenCalledWith(createCouponDto);
    });
  })
});