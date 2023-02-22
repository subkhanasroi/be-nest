import { Module } from '@nestjs/common';
import { ApiService } from './api.service';
import { ApiController } from './api.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Users, UserSchema } from './schemas/users.schema';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategy/local.strategy';
import { JwtStrategy } from './strategy/jwt.strategy';

@Module({
  imports: [MongooseModule.forFeature([{ name: Users.name, schema: UserSchema },]), 
  JwtModule.register({
    secret: "rahasia",
    signOptions: { expiresIn: '1d' }
  }),PassportModule],
  controllers: [ApiController],
  providers: [
    ApiService,
    LocalStrategy,
    JwtStrategy,
    JwtService
  ],

})
export class ApiModule { }
