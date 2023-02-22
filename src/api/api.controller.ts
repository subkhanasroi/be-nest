import { Controller, Request, UseGuards, Get, Res, Post, Body, Param, HttpStatus, Put, UseInterceptors, UploadedFile, } from '@nestjs/common';
import { ApiService } from './api.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as path from 'path';
import { JwtAuthGuard } from './guard/jwt-auth.guard';
import { IUsers } from './schemas/users.interface';


@Controller('api')
export class ApiController {
  constructor(
    private readonly apiService: ApiService) { }

  //login user
  @Post('login')
  async login(@Body() req): Promise<any> {
    return this.apiService.login(req);
  }

  //register user
  @Post('register')
  async createUser(@Res() response, @Body() createUserDto: CreateUserDto) {
    createUserDto.profile = {
      display_name: "",
      photo_profile:"",
      gender: "",
      birthday: "",
      zodiac: "",
      height: 0,
      weight: 0,
    };
    try {
      const data = await this.apiService.createUsers(createUserDto);
      return response.status(HttpStatus.CREATED).json({
        message: 'User has been created Successfully', data
      });

    } catch (e) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Error User Not Created!',
        error: 'Bad Request'
      })
    }
  }

  //get user by id
  @UseGuards(JwtAuthGuard)
  @Get('users/:id')
  async find(@Res() response, @Param('id') userId: number) {
    try {
      const data = await this.apiService.findUser(userId);
      return response.status(HttpStatus.OK).json({
        message: 'User found succesfully', data
      });
    } catch (e) {
      return response.status(e.status).json(e.status);
    }
  }

  //get all users
  @Get('users')
  async allUser(@Res() response) {
    try {
      const data = await this.apiService.findAllUser();
      return response.status(HttpStatus.OK).json({
        message: 'All User data found successfully!', data
      });
    } catch (e) {
      return response.status(e.status).json(e.status);
    }
  }
  //update user by id
  @UseGuards(JwtAuthGuard)
  @Put('users/:id')
  async updateUser(@Res() response, @Param('id') userId: string, @Body() updateUserDto: UpdateUserDto) {
    try {
      const data = await this.apiService.updateUsers(userId, updateUserDto);
      return response.status(HttpStatus.OK).json({
        message: 'Users has been succesfully update',
        data
      });
    } catch (e) {
      return response.status(e.status).json(e.status);
    }
  }

  //upload file
  @Post('upload')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: `./storage/product_image/`,
      filename: (req, file, callBack) => {
        const fileName = path.parse(file.originalname).name.replace(/\s/g, '');
        const extension = path.parse(file.originalname).ext;
        callBack(null, `${fileName}${extension}`);
      }
    })
  }),)
  uploadFile(@Res() response, @UploadedFile() file) {
    return response.status(HttpStatus.OK).json({
      success: true,
      data: file.path
    });
  }

  //upload photo profile
  @UseGuards(JwtAuthGuard)
  @Put('upload-photo/:id')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: `./storage/profile_user/`,
      filename: (req, file, callBack) => {
        const fileName = path.parse(file.originalname).name.replace(/\s/g, '');
        const extension = path.parse(file.originalname).ext;
        callBack(null, `${fileName}${extension}`);
      }
    })
  }),)
  async uploadProfileImage(@Res() response,@Param('id') userId:number, @UploadedFile() file,updateUserDto:UpdateUserDto):Promise<IUsers> {
    try{
      const data = await this.apiService.findUser(userId);
      data.profile.photo_profile = file.path;
      return response.status(HttpStatus.OK).json({
        success: true,
        data
      });
    }catch (e) {
      return response.status(e.status).json(e.status);
    }
  }
  
}

