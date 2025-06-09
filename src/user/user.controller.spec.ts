import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { Types } from 'mongoose';
import { UserDto } from './dto/user.dto';

describe('UserController', () => {
  let controller: UserController;
  let service: UserService;

  const mockUserService = {
    create: jest.fn(),
    createUsers: jest.fn(),
    getUser: jest.fn(),
    getUsers: jest.fn(),
    deleteAll: jest.fn()
  }

  const mockUsers: UserDto[] = Array(5).fill(null).map((_, index) => ({
    id: new Types.ObjectId().toString(),
    name: `김아무개${index}`,
    createdAt: new Date()
  }))
  

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: mockUserService
        }
      ]
    }).compile();

    await new Promise(resolve => setTimeout(resolve, 1000));

    controller = module.get<UserController>(UserController)
  });

  afterAll(async () => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('GET /users/ - 유저 조회', () => {
    describe('/:id 단일 유저 조회', () => {
      it('유저 조회 성공', async () => {
        mockUserService.getUser.mockResolvedValue(mockUsers[0]);
  
        const user = await controller.getUser(mockUsers[0].id);
        expect(user).toBeDefined();
        expect(user?.id).toBe(mockUsers[0].id);
        expect(user?.name).toBe(mockUsers[0].name);
        expect(user?.createdAt).toBeInstanceOf(Date);
      });
      it('유저 조회 실패', async () => {
        mockUserService.getUser.mockResolvedValue(null);
  
        const user = await controller.getUser(mockUsers[0].id);
        expect(user).toBeNull();
      });
    })

    describe('/ 전체 유저 조회', () => {
    })
  });

  describe('POST /user - 유저 생성', () => {
    
    describe('/ 단일 유저 생성', () => {
      it('유저 생성 성공', async () => {
        mockUserService.create.mockResolvedValue(mockUsers[0]);

        const user = await controller.createUser(mockUsers[0]);
        expect(user).toBeDefined();
        expect(user?.id).toBe(mockUsers[0].id);
        expect(user?.name).toBe(mockUsers[0].name);
        expect(user?.createdAt).toBeInstanceOf(Date);
      });
      it('유저 생성 실패', async () => {
        mockUserService.create.mockResolvedValue(null);

        const user = await controller.createUser(mockUsers[0]);
        expect(user).toBeNull();
      });
    })

    describe('/random 랜덤 유저 생성', () => {
      it('유저 생성 성공 3명', async () => {
        mockUserService.deleteAll.mockResolvedValue(undefined);
        mockUserService.createUsers.mockResolvedValue(mockUsers.slice(0, 3));

        const users = await controller.createUsers(3);
        expect(users).toBeDefined();
        expect(users.length).toBe(3);
        expect(users[0].id).toBe(mockUsers[0].id);
        expect(users[0].name).toBe(mockUsers[0].name);
        expect(users[0].createdAt).toBeInstanceOf(Date);
      });

      it('유저 생성 성공 10명', async () => {
        mockUserService.deleteAll.mockResolvedValue(undefined);
        mockUserService.createUsers.mockResolvedValue(mockUsers);

        const users = await controller.createUsers(10);
        expect(users).toBeDefined();
        expect(users.length).toBe(5);
      });

      it('유저 생성 실패', async () => {
        mockUserService.deleteAll.mockResolvedValue(undefined);
        mockUserService.createUsers.mockResolvedValue(null);

        const users = await controller.createUsers(10);
        expect(users).toBeNull();
      });
    })
  });
});
