import { Controller, Get, Post, Body,Res, Patch, Param, Delete, HttpStatus } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { response } from 'express';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // @Post()
  // create(@Body() createUserDto: CreateUserDto) {
  //   return this.usersService.create(createUserDto);
  // }

  @Post()
  async createUser(@Res() response, @Body() createUserDto:CreateUserDto){
    try{
      const newUser = await this.usersService.create(createUserDto);

      return response.status(HttpStatus.CREATED).json({
        message:'User has been created Successfully',newUser
      });

    }catch (e){
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode:400,
        message:'Error User Not Created!',
        error:'Bad Request'
      })
    }
  }

  @Get(':id')
  async find(@Param('id') id:number){
    return await this.usersService.findOne(id);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
