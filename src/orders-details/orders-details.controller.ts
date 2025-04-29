import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OrdersDetailsService } from './orders-details.service';
import { CreateOrdersDetailDto } from './dto/create-orders-detail.dto';
import { UpdateOrdersDetailDto } from './dto/update-orders-detail.dto';

@Controller('orders-details')
export class OrdersDetailsController {
  constructor(private readonly ordersDetailsService: OrdersDetailsService) {}

  
}
