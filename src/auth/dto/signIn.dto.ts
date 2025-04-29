import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class SignInDto {
    @ApiProperty({
        description: 'Correo electrónico registrado del usuario',
        example: 'claudia.lopez@example.com',
    })
    @IsEmail({}, {message: 'El correo electronico debe tener un formato valido'})
    email: string;

    @ApiProperty({
        description: 'Contraseña del usuario (mínimo 8 y máximo 15 caracteres)',
        example: 'MariaPass456!',
    })
    @IsNotEmpty()
    @IsString({message: 'La contraseña debe ser una cadena de texto'})
    @MinLength(8, {message: 'La contraseña debe tener al menos 8 caracteres'})
    @MaxLength(15, {message: 'La contraseña debe tener como maximo 15 caracteres'})
    password: string;
}
