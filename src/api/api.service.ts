import { Injectable, NotAcceptableException, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose'
import { Users } from './schemas/users.schema';
import { IUsers } from './schemas/users.interface';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UploadFileDto } from './dto/upload-file.dto';
import { JwtService } from '@nestjs/jwt';



@Injectable()
export class ApiService {
  constructor(
    @InjectModel(Users.name) private readonly model: Model<IUsers>,
    private jwtService: JwtService,
  ) { }
  async createUsers(createUserDto: CreateUserDto): Promise<IUsers> {
    const newUsers = await new this.model(createUserDto);
    return newUsers.save();
  }

  async uploadFile(uploadFileDto: UploadFileDto): Promise<IUsers> {
    const data = await new this.model(uploadFileDto);
    return data.save();
  }

  async findUser(userId: number): Promise<IUsers> {
    const exitingUser = await this.model.findById(userId).exec();
    if (!exitingUser) throw new NotFoundException(`Users #${userId} not found!`);
    return exitingUser;
  }

  async findAllUser(): Promise<IUsers[]> {
    const data = await this.model.find();
    if (!data || data.length == 0) throw new NotFoundException(' Users data not found!');
    return data;
  }

  async updateUsers(userId: string, updateUserDto: UpdateUserDto): Promise<IUsers> {
    const profile = await this.model.findById(userId)
    if (!profile) throw new NotFoundException(`User #${userId} not found!`);

    profile.profile = {
      ...profile.profile,
      ...updateUserDto
    }
 
    return profile;
  }
  async updateProfile(userId: string, updateUserDto: UpdateUserDto): Promise<IUsers> {
    const data = await this.model.findByIdAndUpdate(userId,  {
      profile: updateUserDto
    }, {
      new: true
    });
    if (!data) throw new NotFoundException(`User #${userId} not found!`);
    return data;
  }

  async getUser(query: object): Promise<IUsers> {
    return this.model.findOne(
      query
    );
  }
  //validate login
  async validateUser(username: string, password: string): Promise<any> {
    const data = await this.model.findOne({ username });
    if (data && data.password === password) {
      const { password, ...result } = data;
      return result;
    }
    if (!data) return null;
    if (!data) {
      throw new NotAcceptableException('could not find the user');
    } else {
      return data;
    }
  }

  async login(user: any) {
    const { email } = user
    const data = await this.model.findOne({email: `${email}`});
    const payload = {data};

    if (!data) {
      return {
        status: "error",
        message: "User Error!"
      }
    }

    const token = await this.jwtService.signAsync(payload,{
      secret: "rahasia",
      expiresIn: "1d" 
    });
    delete user.password
    return {
      access_token: token,
      data
    }
  }


}
