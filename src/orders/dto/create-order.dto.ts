import { ArrayNotEmpty, IsArray, IsString, IsUUID, ValidateNested } from "class-validator";
import {Type} from 'class-transformer';
import { ApiProperty } from "@nestjs/swagger";

class ProductItemDto {
    @ApiProperty({
        description: 'UUID del producto que se desea ordenar',
        example: 'b1e3e777-3345-43d0-8105-fb51a3f68e0e',
    })
    @IsUUID(undefined, { message: 'El ID del producto debe ser un UUID válido' })
    id: string;
}

export class CreateOrderDto {
    @ApiProperty({
        description: 'UUID del usuario que realiza la orden',
        example: 'f6c1a4d7-3d9f-4fc7-9d7e-8a16c6a92e4b',
    })
    @IsUUID(undefined, { message: 'El ID del usuario debe ser un UUID válido' })
    userId: string;


    @ApiProperty({
        description: 'Lista de productos a incluir en la orden. Debe contener al menos un producto.',
        type: [ProductItemDto],
    })
    @ArrayNotEmpty({ message: 'Debe incluir al menos un producto en la orden' })
    @ValidateNested({each: true})
    @Type(()=> ProductItemDto)
    products: ProductItemDto[];
}
