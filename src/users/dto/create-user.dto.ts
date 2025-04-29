import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsNumberString, IsOptional, IsString, Length, Matches } from "class-validator";

export class CreateUserDto {

    @ApiProperty({
        description: 'Nombre completo del usuario',
        example: 'Juan Pérez',
        minLength: 3,
        maxLength: 80,
    })
    @IsString()
    @IsNotEmpty({message: 'El nombre es requerido'})
    @Length(3, 80, {message: 'El nombre debe tener entre 3 y 80 caracteres'})
    name: string;
    
    @ApiProperty({
        description: 'Correo electrónico del usuario',
        example: 'juan.perez@example.com',
    })
    @IsEmail({}, {message: 'El correo electronico debe tener un formato valido'})
    email: string;
    
    @ApiProperty({
        description: 'Contraseña del usuario. Debe tener entre 8 y 15 caracteres e incluir al menos una letra minúscula, una mayúscula, un número y un carácter especial (!@#$%^&*)',
        example: 'P@ssw0rd123!',
        minLength: 8,
        maxLength: 15,
    })
    @IsString()
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,15}$/, {
        message: 'La contraseña debe tener entre 8 y 15 caracteres, incluir al menos una letra minúscula, una mayúscula, un número y un carácter especial (!@#$%^&*)'
    })
    password: string;
    

    @ApiProperty({
        description: 'Dirección del usuario',
        example: 'Av. Siempre Viva 742',
        minLength: 3,
        maxLength: 80,
    })
    @IsString()
    @Length(3,80,{message: 'La direccion debe tener entre 3 y 80 caracteres'})
    address: string;
    

    @ApiProperty({
        description: 'Número de teléfono del usuario',
        example: '1123456789',
    })
    @IsNumberString({}, {message: 'El telefono debe ser un numero'})
    phone:string;


    @ApiPropertyOptional({
        description: 'País del usuario (opcional)',
        example: 'Argentina',
        minLength: 5,
        maxLength: 20,
    })
    @IsOptional(null)
    @IsString()
    @Length(5,20,{message: 'El pais debe tener entre 5 y 20 caracteres'})
    country?: string;


    @ApiPropertyOptional({
        description: 'Ciudad del usuario (opcional)',
        example: 'Buenos Aires',
        minLength: 5,
        maxLength: 20,
    })
    @IsOptional(null)
    @IsString()
    @Length(5,20,{message: 'La ciudad debe tener entre 5 y 20 caracteres'})
    city?: string;
}
