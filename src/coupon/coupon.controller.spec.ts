import { Test, TestingModule } from "@nestjs/testing";
import { CouponController } from "./coupon.controller";
import { CouponService } from "./coupon.service";

describe('CouponController', () => {
  let controller: CouponController;
  let service: CouponService;

  beforeEach(async () => {
    const mockCouponService = {
      createCoupon: jest.fn(),
      getCoupon: jest.fn(),
      updateCoupon: jest.fn(),
      deleteCoupon: jest.fn(),
    }

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

  describe('GET /coupons/:id 쿠폰 목록 조회', () => {
    it('쿠폰 목록 조회 성공', async () => {
      // TODO: 쿠폰 목록 조회 성공
    });

    it('쿠폰 목록이 없을 때 실패', async () => {
      // TODO: 쿠폰 목록이 없을 때 예외 처리
    });
  })

  describe('POST /coupons/:id 쿠폰 생성', () => {
    it('쿠폰 생성 성공', async () => {
      // TODO: 쿠폰 생성 성공
    });

    it('쿠폰 생성 실패', async () => {
      // TODO: 쿠폰 생성 실패
    });
  })
});