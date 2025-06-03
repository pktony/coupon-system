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

  async getUsers() : Promise<UserDto[]> {
    return this.userDao.findAll();
  }

  async getUser(id: string): Promise<UserDto | null> {
    return this.userDao.findById(id);
  }
}