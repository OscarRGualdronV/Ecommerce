import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { GlobalMidleware } from './logger-middleware/logger-middleware.middleware';
import { ValidationPipe } from '@nestjs/common';
import { CategoriesSeed } from './seeder/categories/categories.seed';
import { ProductsSeed } from './seeder/products/product.seed';
import { auth } from 'express-openid-connect'
import { config as auth0Config } from './config/auth0.config'


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(auth(auth0Config));
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // Elimina propiedades que no estan en el DTO
    forbidNonWhitelisted: true, // Lanza error si se envia algo que no esta en el DTO
    transform: true // Convierte los tipos automaticamente
  }))
  app.use(GlobalMidleware);
  const categoriesSeed = app.get(CategoriesSeed);
  await categoriesSeed.seed();
  console.log('La inserción de Categorias ha terminado');;
  
  const productsSeed = app.get(ProductsSeed);
  await productsSeed.seed();
  console.log('La inserción de Productos ha terminado');
  
  await app.listen(3000);
  
  
}
bootstrap();
