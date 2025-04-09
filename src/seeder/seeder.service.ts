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
                password: '123456',
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
            {
                id: 4,
                email: 'maria.gomez@example.com',
                name: 'María Gómez',
                password: 'claveSegura1',
                address: 'Av. Siempre Viva 742',
                phone: '+5215512345678',
                country: 'México',
                city: 'Guadalajara',
            },
            {
                id: 5,
                email: 'luis.fernandez@example.com',
                name: 'Luis Fernández',
                password: 'miPassword2',
                address: 'Calle Luna 333',
                phone: '+5215587654321',
                country: 'México',
                city: 'Monterrey',
            },
            {
                id: 6,
                email: 'ana.torres@example.com',
                name: 'Ana Torres',
                password: 'passAna123',
                address: 'Diagonal Sur 456',
                phone: '+5215544556677',
                country: 'México',
                city: 'Puebla',
            },
            {
                id: 7,
                email: 'carlos.mendez@example.com',
                name: 'Carlos Méndez',
                password: 'CarlosPass!4',
                address: 'Calle Norte 999',
                phone: '+5215566778899',
                country: 'México',
                city: 'Querétaro',
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
            {
                id: 4,
                name: 'Laptop Lenovo IdeaPad 3',
                description: 'Laptop de 15.6" con procesador AMD Ryzen 5, 8GB RAM y 256GB SSD.',
                price: 15499.99,
                stock: true,
                imgUrl: 'https://example.com/images/lenovo-ideapad3.jpg',
            },
            {
                id: 5,
                name: 'Smartphone Samsung Galaxy A54',
                description: 'Pantalla Super AMOLED de 6.4", 128GB de almacenamiento y cámara triple.',
                price: 8499.00,
                stock: true,
                imgUrl: 'https://example.com/images/galaxy-a54.jpg',
            },
            {
                id: 6,
                name: 'Audífonos Inalámbricos JBL Tune 510BT',
                description: 'Sonido JBL Pure Bass, Bluetooth 5.0 y hasta 40 horas de batería.',
                price: 1199.50,
                stock: true,
                imgUrl: 'https://example.com/images/jbl-510bt.jpg',
            },
            {
                id: 7,
                name: 'Monitor LG 24" Full HD',
                description: 'Monitor IPS de 24 pulgadas, resolución 1920x1080, HDMI y tecnología FreeSync.',
                price: 2999.90,
                stock: true,
                imgUrl: 'https://example.com/images/lg-monitor-24.jpg',
            },
        ];
        products.forEach(products => this.productsService.create(products))
    }
}