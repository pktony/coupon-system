import { Test, TestingModule } from '@nestjs/testing';
import { UserCouponService } from './user-coupon.service';
import { UserCouponController } from './user-coupon.controller';

describe('UserCouponController', () => {
  let controller: UserCouponController;
  let service: UserCouponService;

  beforeEach(async () => {
    const mockUserCouponService = {
      issueCoupon: jest.fn(),
      getUserCoupons: jest.fn(),
      useCoupon: jest.fn(),
      getCouponUsers: jest.fn(),
    }

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserCouponController],
      providers: [
        {
          provide: UserCouponService,
          useValue: {
            useValue: mockUserCouponService
          }
        }
      ]
    }).compile();

    controller = module.get<UserCouponController>(UserCouponController)
    service = module.get<UserCouponService>(UserCouponService)
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('GET /user-coupons 유저가 보유한 쿠폰 조회', () => {
    it('유저 쿠폰 조회 성공', async () => {
      // TODO: 유저 쿠폰 조회 성공
    });

    it('존재하지 않는 유저일 때 실패', async () => {
      // TODO: 존재하지 않는 유저 ID로 요청 시 예외 처리
    });

    it('유저 쿠폰 목록이 없을 때 실패', async () => {
      // TODO: 유저 쿠폰 목록이 없을 때 예외 처리
    });
  })

  describe('POST user-coupons/:id/issue 쿠폰 발급', () => {
    it('쿠폰 발급 성공', async () => {
      // TODO: 정상적으로 쿠폰이 발급되는 경우
    });

    it('이미 발급된 쿠폰일 때 실패', async () => {
      // TODO: 이미 해당 유저에게 발급된 쿠폰일 때 예외 처리
    });

    it('존재하지 않는 쿠폰일 때 실패', async () => {
      // TODO: 존재하지 않는 쿠폰 ID로 요청 시 예외 처리
    });

    it('만료된 쿠폰일 때 실패', async () => {
      // TODO: 만료된 쿠폰에 대해 발급 요청 시 예외 처리
    });

    it('발급 수량 초과 시 실패', async () => {
      // TODO: 쿠폰의 발급 한도를 초과했을 때 예외 처리
    });

    it('유저 정보가 없을 때 실패', async () => {
      // TODO: 유저 정보가 없거나 잘못된 경우 예외 처리
    });
  })

  describe('GET user-coupons/:id/users 특정 쿠폰을 발급한 유저 조회', () => {
    it('쿠폰 발급 목록 조회 성공', async () => {
      // TODO: 쿠폰 발급 목록 조회 성공
    });

    it('존재하지 않는 쿠폰일 때 실패', async () => {
      // TODO: 존재하지 않는 쿠폰 ID로 요청 시 예외 처리
    });

    it('쿠폰 발급 목록이 없을 때 실패', async () => {
      // TODO: 쿠폰 발급 목록이 없을 때 예외 처리
    });
  })

  describe('POST user-coupons/:id/use 쿠폰 사용', () => {
    it('쿠폰 사용 성공', async () => {
      // TODO: 쿠폰 사용 성공
    });

    it('존재하지 않는 쿠폰일 때 실패', async () => {
      // TODO: 존재하지 않는 쿠폰 ID로 요청 시 예외 처리
    });

    it('쿠폰 사용 수량 초과 시 실패', async () => {
      // TODO: 쿠폰 사용 수량을 초과했을 때 예외 처리
    });
    
    it('유저 정보가 없을 때 실패', async () => {
      // TODO: 유저 정보가 없거나 잘못된 경우 예외 처리
    });

    it('쿠폰 사용 일시가 만료된 쿠폰일 때 실패', async () => {
      // TODO: 쿠폰 사용 일시가 만료된 쿠폰일 때 예외 처리
    });
  })
});