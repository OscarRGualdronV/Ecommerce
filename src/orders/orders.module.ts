import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderEntity } from './entities/order.entity';
import { UsersModule } from 'src/users/users.module';
import { ProductsModule } from 'src/products/products.module';
import { OrdersDetailsModule } from 'src/orders-details/orders-details.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([OrderEntity]),
    UsersModule,
    ProductsModule,
    OrdersDetailsModule,
  ],
  controllers: [OrdersController],
  providers: [OrdersService],
  exports: []
})
export class OrdersModule {}
