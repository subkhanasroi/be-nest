import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose'
import { Users, UsersDocument } from './schemas/users.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(Users.name) private readonly model: Model<UsersDocument>,
  ) { }

  async create(createUserDto: CreateUserDto) {
    return await new this.model({
      ...createUserDto,
      createAt: new Date(),
    }).save();
  }

  async findAll() {
    return await this.model.find().exec();
  }

  async findOne(id: number) {
    return this.model.findById(id).exec;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return await this.model.findByIdAndUpdate(id, updateUserDto).exec;
  }

  async remove(id: number) {
    return this.model.findByIdAndDelete(id).exec;
  }


}
