import { Test, TestingModule } from "@nestjs/testing";
import { UserService } from "./user.service";
import { MongoMemoryReplSet } from "mongodb-memory-server";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "./entity/user.schema";
import { Types } from "mongoose";
import { UserDto } from "./dto/user.dto";
import { UserDao } from "./dao/user.dao";

describe('UserService', () => {
  let service: UserService;
  let mongodb: MongoMemoryReplSet;
  let userDao: UserDao;

  beforeAll(async () => {
    mongodb = await MongoMemoryReplSet.create({
      replSet: { count: 2, storageEngine: 'wiredTiger' }
    });
    const uri = mongodb.getUri();

    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot(uri),
        MongooseModule.forFeature([
          { name: User.name, schema: UserSchema }
        ]),
      ],
      providers: [UserService, UserDao],
    }).compile();

    service = module.get<UserService>(UserService);
    userDao = module.get<UserDao>(UserDao);
  });

  afterAll(async () => {
    await mongodb.stop();
  });

  beforeEach(async () => {
    await service.createUsers(5);
  });

  afterEach(async () => {
    await userDao.deleteAll();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('GET', () => {
    describe('getUsers', () => {
      it('user 5명 조회', async () => {
        const users = await service.getUsers(5);
        expect(users).toBeDefined();
        expect(users.length).toBe(5);
        users.forEach((user) => {
          expect(user.id).toBeDefined();
          expect(user.name).toBeDefined();
          expect(user.createdAt).toBeInstanceOf(Date);
        });
      });
    })

    describe('getUser', () => {
      it('user 1명 조회', async () => {
        const users = await service.getUsers(5);
        const user = await service.getUser(users[0].id);
        expect(user).toBeDefined();
        expect(user?.id).toBe(users[0].id);
        expect(user?.name).toBe(users[0].name);
        expect(user?.createdAt).toBeInstanceOf(Date);
      });
    })
  });

  describe('CREATE', () => {
    describe('createUsers', () => {
      it('user 여러명 생성', async () => {
        const users = await service.createUsers(5);
        expect(users).toBeDefined();
        expect(users.length).toBe(5);

        const allUsers = await service.getUsers(10);
        expect(allUsers).toBeDefined();
        expect(allUsers.length).toBe(10);

        allUsers.forEach((user) => {
          expect(user.id).toBeDefined();
        });
      });
    })

    describe('createUser', () => {
      it('user 1명 생성', async () => {
        const user = await service.create({ name: 'test' });
        expect(user).toBeDefined();
        expect(user.id).toBeDefined();
      });
    })
  });

  describe('DELETE', () => {
    it('user 모두 삭제', async () => {
      await service.deleteAll();
      const users = await service.getUsers(5);
      expect(users).toBeDefined();
      expect(users.length).toBe(0);
    });
  });
});