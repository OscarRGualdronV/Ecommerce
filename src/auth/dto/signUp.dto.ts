import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsNumberString, IsOptional, IsString, Length, Matches } from "class-validator";


export class SignUpDto {

        @ApiProperty({
        description: 'Nombre completo del usuario',
        example: 'Marcos Beltran',
        })
        @IsString()
        @IsNotEmpty({message: 'El nombre es requerido'})
        @Length(3, 80, {message: 'El nombre debe tener entre 3 y 80 caracteres'})
        name: string;
        

        @ApiProperty({
            description: 'Correo electrónico del usuario',
            example: 'marcosBeltran@example.com',
        })
        @IsEmail({}, {message: 'El correo electronico debe tener un formato valido'})
        email: string;
        

        @ApiProperty({
            description: 'Contraseña segura con al menos una mayúscula, una minúscula, un número y un carácter especial',
            example: 'Usuario12$',
        })
        @IsString()
        @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,15}$/, {
            message: 'La contraseña debe tener entre 8 y 15 caracteres, incluir al menos una letra minúscula, una mayúscula, un número y un carácter especial (!@#$%^&*)'
        })
        password: string;
        

        @ApiProperty({
            description: 'Confirmación de la contraseña',
            example: 'Usuario12$',
        })
        @IsString()
        @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,15}$/, {
            message: 'La contraseña debe tener entre 8 y 15 caracteres, incluir al menos una letra minúscula, una mayúscula, un número y un carácter especial (!@#$%^&*)'
        })
        passwordConfirmation: string;
    

        @ApiProperty({
            description: 'Dirección física del usuario',
            example: 'Calle 56 # 36 - 85 Conjunto Miradores',
        })
        @IsString()
        @Length(3,80,{message: 'La direccion debe tener entre 3 y 80 caracteres'})
        address: string;
        

        @ApiProperty({
            description: 'Teléfono del usuario',
            example: '3458953675',
        })
        @IsNumberString({}, {message: 'El telefono debe ser un numero'})
        phone:string;
        

        @ApiPropertyOptional({
            description: 'País del usuario',
            example: 'Colombia',
        })
        @IsOptional(null)
        @IsString()
        @Length(5,20,{message: 'El pais debe tener entre 5 y 20 caracteres'})
        country?: string;
    

        @ApiPropertyOptional({
            description: 'Ciudad del usuario',
            example: 'Medellin',
        })
        @IsOptional(null)
        @IsString()
        @Length(5,20,{message: 'La ciudad debe tener entre 5 y 20 caracteres'})
        city?: string;
}