import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderEntity } from './entities/order.entity';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';
import { ProductsService } from 'src/products/products.service';
import { OrdersDetailsService } from 'src/orders-details/orders-details.service';
import { CreateOrderDto } from './dto/create-order.dto';


@Controller('orders')
export class OrdersController {
  constructor() {}


}
