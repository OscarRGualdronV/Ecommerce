import { IsEmail, IsNotEmpty, IsNumberString, IsOptional, IsString, Length, Matches } from "class-validator";


export class SignUpDto {
        @IsString()
        @IsNotEmpty({message: 'El nombre es requerido'})
        @Length(3, 80, {message: 'El nombre debe tener entre 3 y 80 caracteres'})
        name: string;
        
        @IsEmail({}, {message: 'El correo electronico debe tener un formato valido'})
        email: string;
        
        @IsString()
        @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,15}$/, {
            message: 'La contraseña debe tener entre 8 y 15 caracteres, incluir al menos una letra minúscula, una mayúscula, un número y un carácter especial (!@#$%^&*)'
        })
        password: string;
        

        @IsString()
        @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,15}$/, {
            message: 'La contraseña debe tener entre 8 y 15 caracteres, incluir al menos una letra minúscula, una mayúscula, un número y un carácter especial (!@#$%^&*)'
        })
        passwordConfirmation: string;
    
        @IsString()
        @Length(3,80,{message: 'La direccion debe tener entre 3 y 80 caracteres'})
        address: string;
        
    
        @IsNumberString({}, {message: 'El telefono debe ser un numero'})
        phone:string;
    
        @IsOptional(null)
        @IsString()
        @Length(5,20,{message: 'El pais debe tener entre 5 y 20 caracteres'})
        country?: string;
    
        @IsOptional(null)
        @IsString()
        @Length(5,20,{message: 'La ciudad debe tener entre 5 y 20 caracteres'})
        city?: string;
}