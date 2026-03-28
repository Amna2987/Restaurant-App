import { IsEmail, IsString, MinLength } from "class-validator";


export class registerDto {

    @IsString()
    name:string

    @IsEmail()
    email:string

    @MinLength(5)
    @IsString()
    password:string

    @MinLength(5)
    @IsString()
    confirmPassword:string
}