import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';

describe('UserController', () => {
  let controller: UserController;
  let service: UserService;

  beforeEach(async () => {
    const mockUserService = {
      createUser: jest.fn(),
      getUser: jest.fn(),
      updateUser: jest.fn(),
      deleteUser: jest.fn(),
    }

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: {
            useValue: mockUserService
          }
        }
      ]
    }).compile();

    controller = module.get<UserController>(UserController)
    service = module.get<UserService>(UserService)
  });

  it('should be defined', () => {
    // TODO: 컨트롤러 정의 여부 테스트
  });

  describe('POST /users - 유저 생성', () => {
    it('유저 생성 성공', async () => {
      // TODO: 정상적으로 유저가 생성되는 경우
    });
    it('유저 생성 실패', async () => {
      // TODO: 필수값 누락 등으로 유저 생성 실패
    });
  });

  describe('GET /users/:id - 유저 조회', () => {
    it('유저 조회 성공', async () => {
      // TODO: 정상적으로 유저 정보 조회
    });
    it('유저 조회 실패', async () => {
      // TODO: 존재하지 않는 유저 조회 시 예외 처리
    });
  });

  describe('PATCH /users/:id - 유저 정보 수정', () => {
    it('유저 정보 수정 성공', async () => {
      // TODO: 정상적으로 유저 정보 수정
    });
    it('유저 정보 수정 실패', async () => {
      // TODO: 잘못된 정보로 수정 시 예외 처리
    });
  });

  describe('DELETE /users/:id - 유저 삭제', () => {
    it('유저 삭제 성공', async () => {
      // TODO: 정상적으로 유저 삭제
    });
    it('유저 삭제 실패', async () => {
      // TODO: 존재하지 않는 유저 삭제 시 예외 처리
    });
  });
});
