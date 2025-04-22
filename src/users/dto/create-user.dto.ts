import { IsEmail, IsNotEmpty, IsOptional, IsPassportNumber, IsPhoneNumber, IsString, MinLength, minLength } from "class-validator";
import { UUID } from "crypto";

export class CreateUserDto {

    @IsString()
    name: string;
    
    @IsEmail()
    email: string;
    
    @MinLength(6)
    password: string;
    
    @IsOptional()
    @IsString()
    address: string;
    
    @IsOptional()
    @IsPhoneNumber(null)
    phone:string;

    @IsOptional(null)
    @IsString()
    country?: string;

    @IsOptional(null)
    @IsString()
    city?: string;
}
