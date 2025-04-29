import { Controller, Get, Post, Body, Param, HttpCode, HttpStatus, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { JwtAuthGuard } from '../auth/authGuard/auth.guard';


@Controller('orders')
@UseGuards(JwtAuthGuard)
export class OrdersController {
  constructor(private readonly orderService: OrdersService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createOrderDto: CreateOrderDto){
    return this.orderService.createOrder(createOrderDto);
  }

  @Get(':id')
  get(@Param('id') id: string){
    return this.orderService.getOrder(id);
  }

}
