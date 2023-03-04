import { IsDate, IsEmpty, IsNotEmpty, IsNumber, IsObject, IsString, MaxLength } from "class-validator";
export class CreateUserDto {

    @IsString()
    @MaxLength(30)
    @IsNotEmpty()
    readonly username: string;

    @IsString()
    @MaxLength(30)
    @IsNotEmpty()
    readonly email: string;

    @IsString()
    @MaxLength(30)
    @IsNotEmpty()
     password: string;

    
    @IsEmpty()
     profile: {
        display_name:string,
        photo_profile:string,
        gender:string,
        birthday:string,
        zodiac:string,
        shio:string,
        height:string,
        weight:string,

    }


}
