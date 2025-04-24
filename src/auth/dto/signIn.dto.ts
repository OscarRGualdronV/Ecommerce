import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class SignInDto {
    @IsEmail({}, {message: 'El correo electronico debe tener un formato valido'})
    email: string;

    @IsNotEmpty()
    @IsString({message: 'La contraseña debe ser una cadena de texto'})
    @MinLength(8, {message: 'La contraseña debe tener al menos 8 caracteres'})
    @MaxLength(15, {message: 'La contraseña debe tener como maximo 15 caracteres'})
    password: string;
}
