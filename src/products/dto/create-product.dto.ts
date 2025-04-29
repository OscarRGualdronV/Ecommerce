import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateProductDto {

    @ApiProperty({
        description: 'Nombre del producto',
        example: 'Xiaomi Poco X5 Pro',
    })
    @IsNotEmpty()
    @IsString()
    name: string;


    @ApiProperty({
        description: 'Descripción del producto',
        example: 'Smartphone de alto rendimiento con pantalla AMOLED de 6.67\", Snapdragon 778G, cámara de 108 MP y carga rápida de 67W.',
    })
    @IsString()
    description: string;


    @ApiProperty({
        description: 'Precio del producto',
        example: 349.99,
        type: Number
    })
    @IsNumber()
    price: number;


    @ApiProperty({
        description: 'Cantidad de stock disponible',
        example: 50,
        type: Number
    })
    @IsNumber()
    stock: number;


    @ApiProperty({
        description: 'URL de la imagen del producto',
        example: 'https://i.blogs.es/86bcef/xiaomi-poco-x5-pro-5g/1366_2000.jpg',
    })
    @IsString()
    @IsString()
    imgUrl: string;


    @ApiProperty({
        description: 'ID de la categoría del producto',
        example: '88565391-f3ac-4c71-aaa8-e3984f80164f',
    })
    @IsString()
    categoryId: string;
}
