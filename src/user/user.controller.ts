import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { ApiOperation } from "@nestjs/swagger";

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: '유저 생성' })
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get(':id')
  @ApiOperation({ summary: '유저 조회' })
  async getUser(@Param('id') id: string) {
    return this.userService.getUser(id);
  }

  @Get()
  @ApiOperation({ summary: '유저 목록 조회' })
  async getUsers() {
    return this.userService.getUsers();
  }
}