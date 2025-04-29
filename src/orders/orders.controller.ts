import { Controller, Get, Post, Body, Param, HttpCode, HttpStatus, UseGuards, ParseUUIDPipe } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { JwtAuthGuard } from '../auth/authGuard/auth.guard';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Orders')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('orders')
export class OrdersController {
  constructor(private readonly orderService: OrdersService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Crear una orden (requiere autenticación)' })
  @ApiResponse({ status: 201, description: 'Orden creada exitosamente.' })
  @ApiResponse({ status: 400, description: 'Datos inválidos para crear la orden.' })
  create(@Body() createOrderDto: CreateOrderDto){
    return this.orderService.createOrder(createOrderDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener los detalles de una orden por ID (requiere autenticación)' })
  @ApiParam({ name: 'id',  type: String, description: 'ID de la orden (UUID)' })
  @ApiResponse({ status: 200, description: 'Detalles de la orden obtenidos.' })
  @ApiResponse({ status: 404, description: 'Orden no encontrada.' })
  get(@Param('id', new ParseUUIDPipe()) id: string){
    return this.orderService.getOrder(id);
  }

}
