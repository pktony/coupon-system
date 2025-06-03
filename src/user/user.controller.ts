import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Query } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { ApiBody, ApiOperation } from "@nestjs/swagger";

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  @ApiBody({ type: CreateUserDto, description: '유저 생성 정보' })
  @ApiOperation({ summary: '유저 생성' })
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Post('random')
  @HttpCode(HttpStatus.OK)
  async createUsers(@Query('count') count: number) {
    await this.userService.deleteAll();
    return this.userService.createUsers(count);
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