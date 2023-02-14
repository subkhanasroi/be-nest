import { IsNotEmpty, IsNumber, IsString, MaxLength } from "class-validator";
export class CreateUserDto {
    @IsString()
    @MaxLength(30)
    @IsNotEmpty()
    readonly name:string;

    @IsString()
    @MaxLength(30)
    @IsNotEmpty()
    readonly email:string;
 }
