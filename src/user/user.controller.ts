import { Controller, Get, Param, Post } from "@nestjs/common";

@Controller('users')
export class UserController {
  @Post()
  async createUser() {
    return 'createUser';
  }

  @Get(':id')
  async getUser(@Param('id') id: string) {
    return 'getUser';
  }
}