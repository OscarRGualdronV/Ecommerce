import { IsBoolean, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateProductDto {

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsString()
    description: string;

    @IsNumber()
    price: number;

    @IsNumber()
    stock: number;

    @IsString()
    imgUrl: string;

    @IsString()
    categoryId: string;
}
