import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { Users,UserSchema } from './schemas/users.schema';
import {MongooseModule} from '@nestjs/mongoose';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports:[
    MongooseModule.forFeature([
      {
        name:Users.name,schema:UserSchema
      }
    ]),
  ]
})
export class UsersModule {}
