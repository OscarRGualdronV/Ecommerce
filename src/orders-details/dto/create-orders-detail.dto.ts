import { IsArray, IsUUID } from "class-validator";

export class CreateOrdersDetailDto {
    @IsUUID()
    orderId: string;

    @IsArray()
    @IsUUID('4', {each: true})
    productIds: string[];
}
