import { UUID } from "crypto";

export class CreateUserDto {
    id: number;
    name: string;
    email: string;
    password: string;
    address: string;
    phone:string;
}
