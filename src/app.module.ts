import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesModule } from './categories/categories.module';
import { OrdersModule } from './orders/orders.module';
import { OrdersDetailsModule } from './orders-details/orders-details.module';
import typeormConfig from './config/data-source';
import { SeedsModule } from './seeder/seeds.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeormConfig]
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        configService.get('postgres'),
    }),
    UsersModule, ProductsModule, AuthModule, CategoriesModule, OrdersModule, OrdersDetailsModule, SeedsModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
      // consumer.apply(LoggerMiddlewareMiddleware).forRoutes(UsersController)
  }
}
