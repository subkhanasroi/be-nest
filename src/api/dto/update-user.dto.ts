import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto {
    display_name?:string
    photo_profile?:string
    gender?:string
    birthday?:string
    zodiac?:string
    shio?:string
    height?:number
    weight?:number
}
