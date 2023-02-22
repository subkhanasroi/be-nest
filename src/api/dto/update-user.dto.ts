import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto {
    profile: {
        display_name:string,
        photo_profile:string,
        gender:string,
        birthday:string,
        zodiac:string,
        height:number,
        weight:number,
    }
}
