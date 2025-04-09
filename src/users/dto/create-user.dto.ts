import { IsEmail, IsNotEmpty, IsOptional, IsPassportNumber, IsPhoneNumber, IsString } from "class-validator";
import { UUID } from "crypto";

export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    name: string;
    
    @IsEmail()
    email: string;
    
    @IsNotEmpty()
    password: string;
    
    @IsNotEmpty()
    address: string;
    
    @IsPhoneNumber(null)
    phone:string;

    @IsOptional()
    country?: string;

    @IsOptional()
    city?: string;
}
