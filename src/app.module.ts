import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApiModule } from './api/api.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Users, UserSchema } from './api/schemas/users.schema';
import { ApiController } from './api/api.controller';
import { ApiService } from './api/api.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [ApiModule, MongooseModule.forRoot('mongodb://127.0.0.1:27017/youapp'), MongooseModule.forFeature([
    { name: Users.name, schema: UserSchema }
  ]), JwtModule],
  controllers: [AppController, ApiController],
  providers: [AppService, ApiService,],
})
export class AppModule {

}
