import { Injectable } from "@nestjs/common";
import { UserDao } from "./dao/user.dao";
import { CreateUserDto } from "./dto/create-user.dto";
import { UserDto } from "./dto/user.dto";

@Injectable()
export class UserService {
  constructor(private readonly userDao: UserDao) {}

  async create(createUserDto: CreateUserDto): Promise<UserDto> {
    return this.userDao.create(createUserDto);
  }

  async createUsers(count: number): Promise<UserDto[]> {
  return this.userDao.createUsers(count);
  }

  async getUsers(count: number) : Promise<UserDto[]> {
    return this.userDao.findAll(count);
  }

  async getUser(id: string): Promise<UserDto | null> {
    return this.userDao.findById(id);
  }

  async deleteAll() {
    return this.userDao.deleteAll();
  }
}