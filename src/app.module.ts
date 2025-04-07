import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { LoggerMiddlewareMiddleware } from './logger-middleware/logger-middleware.middleware';
import { UsersController } from './users/users.controller';
import { SeederService } from './seeder/seeder.service';
import { UsersService } from './users/users.service';

@Module({
  imports: [ProductsModule, UsersModule, AuthModule],
  controllers: [],
  providers: [SeederService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
      // consumer.apply(LoggerMiddlewareMiddleware).forRoutes(UsersController)
  }
}
