import { ArrayNotEmpty, IsArray, IsString, IsUUID, ValidateNested } from "class-validator";
import {Type} from 'class-transformer';

class ProductItemDto {
    @IsUUID()
    id: string;
}

export class CreateOrderDto {
    @IsUUID()
    userId: string;

    @ArrayNotEmpty()
    @ValidateNested({each: true})
    @Type(()=> ProductItemDto)
    products: ProductItemDto[];
}
