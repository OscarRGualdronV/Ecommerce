import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderEntity } from './entities/order.entity';
import { Repository, In } from 'typeorm';
import { OrdersDetailEntity } from 'src/orders-details/entities/orders-detail.entity';
import { ProductEntity } from 'src/products/entities/product.entity';
import { UserEntity } from 'src/users/entities/user.entity';


@Injectable()
export class OrdersService {
    constructor(
        @InjectRepository(OrderEntity)
        private readonly orderRepository: Repository<OrderEntity>,

        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,

        @InjectRepository(OrdersDetailEntity)
        private readonly orderDetailRepository: Repository<OrdersDetailEntity>,

        @InjectRepository(ProductEntity)
        private readonly productRepository: Repository<ProductEntity>,
    ){}

    async createOrder(createOrderDto: CreateOrderDto){
        const user = await this.userRepository.findOne({where: {id: createOrderDto.userId}});
        if(!user) throw new NotFoundException('Usuario no encontrado');

        const productIds = createOrderDto.products.map(p => p.id);
        const products = await this.productRepository.find({
            where: { id: In(productIds)},
        });

        if (products.length !== productIds.length) {
            throw new NotFoundException('Uno o mas productos no existen');
        }

        // Verificar si hay productos sin stock
        const outOfStock = products.filter(p => p.stock <= 0);
        if (outOfStock.length > 0) {
            const names = outOfStock.map(p => p.name).join(', ');
            throw new BadRequestException(`Sin stock disponible para: ${names}`);
        }

        // Descontar stock para cada producto (cantidad = 1)
        for (const product of products){
            product.stock -= 1; // se asume que solo se va a comprar una unidad por producto
        }
        await this.productRepository.save(products);

        // Crea la orden
        const order = this.orderRepository.create({ user });
        await this.orderRepository.save(order);

        // Calcular el total de la orden
        const total = products.reduce((sum, p) => sum + Number(p.price), 0);

        // Crear el detalle de la orden 
        const orderDetail = this.orderDetailRepository.create({
            price: total,
            order,
            products,
        });
        await this.orderDetailRepository.save(orderDetail);

        return {message: 'Orden creada exitosamente', orderId: order.id};
    }

    async getOrder(id: string){
        const order = await this.orderRepository.findOne({
            where: {id},
            relations: ['user'],
        });

        const orderDetail = await this.orderDetailRepository.findOne({
            where: { order: {id}},
            relations: ['products'],
        });

        if (!order || !orderDetail) {
            throw new NotFoundException('Order no encontrada');
        }

        const user = {
            name: order.user.name,
            email: order.user.email,
            country: order.user.country,
            city: order.user.city,
            phone: order.user.phone,
            address: order.user.address,
        }

        const products = orderDetail.products.map(product => ({
            id: product.id,
            name: product.name,
            description: product.description,
            price: product.price,
        }))

        return {
            orderId: order.id,
            date: order.date,
            user,
            total: orderDetail.price,
            products,
        }
    }

}
