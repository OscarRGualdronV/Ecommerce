import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderEntity } from './entities/order.entity';
import { UserEntity } from 'src/users/entities/user.entity';
import { OrdersDetailEntity } from 'src/orders-details/entities/orders-detail.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OrderEntity, UserEntity, OrdersDetailEntity])],
  controllers: [OrdersController],
  providers: [OrdersService],
  exports: []
})
export class OrdersModule {}
