import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { ProductsRepository } from './products.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from './entities/product.entity';
import { CategoryEntity } from '../categories/entities/category.entity';
import { OrdersDetailEntity } from '../orders-details/entities/orders-detail.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProductEntity, CategoryEntity, OrdersDetailEntity])],
  controllers: [ProductsController],
  providers: [ProductsService, ProductsRepository],
  exports: [ProductsService],
})
export class ProductsModule {}
