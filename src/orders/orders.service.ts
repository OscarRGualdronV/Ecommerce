import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UsersService } from 'src/users/users.service';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderEntity } from './entities/order.entity';
import { Repository } from 'typeorm';
import { ProductsService } from 'src/products/products.service';
import { OrdersDetailsService } from 'src/orders-details/orders-details.service';


@Injectable()
export class OrdersService {
    constructor(
        @InjectRepository(OrderEntity)
        private readonly orderRepository: Repository<OrderEntity>,
        private readonly userService: UsersService,
        private readonly productService: ProductsService,
        private readonly orderDetailsService: OrdersDetailsService,
    ){}


    async create(createOrderDto: CreateOrderDto){
        const {userId, products } = createOrderDto;
        const user = await this.userService.findOne(userId)

        const order = {
            user: user,
            date: new Date(),
        };
        const orderEntity = await this.orderRepository.save(
            this.orderRepository.create(order),
        )
    }
}
