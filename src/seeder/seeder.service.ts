import { Injectable, OnModuleInit } from "@nestjs/common";
import { ProductsService } from "src/products/products.service";
import { UsersService } from "src/users/users.service";

@Injectable()
export class SeederService implements OnModuleInit {
    constructor(
        private readonly userService: UsersService,
        private readonly productsService: ProductsService,
    ){}

    onModuleInit() {
        this.seedUsers();
        this.seedProducts();
    }

    private seedUsers(){
        const users = [
            {
                id: 1,
                email: 'ana@example.com',
                name: 'Ana Gómez',
                password: '1234',
                address: 'Calle Falsa 123',
                phone: '123456789',
                country: 'Chile',
                city: 'Santiago',
            },
            {
                id: 2,
                email: 'juan@example.com',
                name: 'Juan Pérez',
                password: 'abcd',
                address: 'Avenida Siempre Viva 742',
                phone: '987654321',
                country: 'Argentina',
                city: 'Buenos Aires',
            },
            {
                id: 3,
                email: 'maria@example.com',
                name: 'María López',
                password: '5678',
                address: 'Calle Luna 45',
                phone: '1122334455',
                country: 'México',
                city: 'CDMX',
            },
        ];

        users.forEach(user => this.userService.create(user))
    }

    private seedProducts() {
        const products = [
            {
                id: 1,
                name: 'Laptop Lenovo',
                description: 'Notebook con 16GB RAM y 512GB SSD',
                price: 950,
                stock: true,
                imgUrl: 'https://example.com/laptop.jpg',
            },
            {
                id: 2,
                name: 'Smartphone Samsung',
                description: 'Celular de gama media con buena cámara',
                price: 600,
                stock: true,
                imgUrl: 'https://example.com/phone.jpg',
            },
            {
                id: 3,
                name: 'Auriculares Bluetooth',
                description: 'Inalámbricos con cancelación de ruido',
                price: 120,
                stock: true,
                imgUrl: 'https://example.com/headphones.jpg',
            },
        ];
        products.forEach(products => this.productsService.create(products))
    }
}