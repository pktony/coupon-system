import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { User, UserDocument } from "../entity/user.schema";
import { Model } from "mongoose";
import { CreateUserDto } from "@user/dto/create-user.dto";
import { UserDto } from "@user/dto/user.dto";

@Injectable()
export class UserDao {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>
  ) {}

  async create(createUserDto: CreateUserDto): Promise<UserDto> {
    const user = await this.userModel.create(createUserDto);
    return this.toUserDto(user);
  }

  async createUsers(count: number): Promise<UserDto[]> {
    const users: User[] = Array.from({ length: count }, (_, index) => ({
      name: `User${index + 1}`,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    const createdUsers = await this.userModel.insertMany(users);
    return createdUsers.map((user) => this.toUserDto(user));
  }

  async findById(id: string): Promise<UserDto | null> {
    const user = await this.userModel.findById(id).exec();
    if (!user) return null;
    return this.toUserDto(user);
  }

  async findAll(count: number): Promise<UserDto[]> {
    const users = await this.userModel.find({}).limit(count);
    return users.map((user) => this.toUserDto(user));
  }

  async deleteAll(): Promise<void> {
    await this.userModel.deleteMany({});
  }

  private toUserDto(user: UserDocument): UserDto {
    const { _id, ...userObject } = user.toObject();
    return {
      id: _id.toString(),
      ...userObject
    };
  }
}