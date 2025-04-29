import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    @ApiPropertyOptional({ example: 'Nuevo Nombre', description: 'Nombre actualizado del usuario' })
    name?: string;

    @ApiPropertyOptional({ example: 'nuevo.email@example.com', description: 'Correo electrónico actualizado del usuario' })
    email?: string;

    @ApiPropertyOptional({
    example: 'Nuev0P@ss!',
    description: 'Contraseña nueva, debe cumplir con los requisitos de seguridad',
    })
    password?: string;

    @ApiPropertyOptional({ example: 'Nueva dirección 123', description: 'Dirección actualizada del usuario' })
    address?: string;

    @ApiPropertyOptional({ example: '1134567890', description: 'Nuevo número de teléfono' })
    phone?: string;

    @ApiPropertyOptional({ example: 'Uruguay', description: 'País actualizado' })
    country?: string;

    @ApiPropertyOptional({ example: 'Montevideo', description: 'Ciudad actualizada' })
    city?: string;
}
