import { IsEmail, IsString, MinLength } from "class-validator";


export class loginDto {

    @IsEmail()
    email:string

    @MinLength(5)
    @IsString()
    password:string
}