import { Module } from '@nestjs/common';
import { OrdersDetailsService } from './orders-details.service';
import { OrdersDetailsController } from './orders-details.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersDetailEntity } from './entities/orders-detail.entity';
import { ProductEntity } from '../products/entities/product.entity';
import { OrderEntity } from '../orders/entities/order.entity';


@Module({
  imports: [TypeOrmModule.forFeature([OrdersDetailEntity, ProductEntity, OrderEntity])],
  controllers: [OrdersDetailsController],
  providers: [OrdersDetailsService],
  exports: [OrdersDetailsService]
})
export class OrdersDetailsModule {}
