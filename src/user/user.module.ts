import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, userSchema } from './entity/user.schema';
import { UserDao } from './dao/user.dao';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: userSchema }])
  ],
  controllers: [UserController],
  providers: [UserService, UserDao],
})
export class UserModule {}