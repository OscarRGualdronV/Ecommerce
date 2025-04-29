import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateProductDto extends PartialType(CreateProductDto) {
    @ApiPropertyOptional({
        description: 'Nuevo nombre del producto',
        example: 'Manzana',
    })
    name?: string;
    
    @ApiPropertyOptional({
        description: 'Nueva descripción del producto',
        example: 'Fruta fresca y orgánica',
    })
    description?: string;
    
    @ApiPropertyOptional({
        description: 'Nuevo precio del producto',
        example: 10.5,
        type: Number
    })
    price?: number;
    
    @ApiPropertyOptional({
        description: 'Nueva cantidad de stock disponible',
        example: 100,
        type: Number
    })
    stock?: number;
    
    @ApiPropertyOptional({
        description: 'Nueva URL de la imagen del producto',
        example: 'https://example.com/image.jpg',
    })
    imgUrl?: string;
    
    @ApiPropertyOptional({
        description: 'ID de la categoría del producto que se quiere actualizar',
        example: 'b7b5b9e1-97f2-49b2-9a67-684b83958e72',
    })
    categoryId?: string;
}
