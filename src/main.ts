import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { GlobalMidleware } from './logger-middleware/logger-middleware.middleware';
import { ValidationPipe } from '@nestjs/common';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // Elimina propiedades que no estan en el DTO
    forbidNonWhitelisted: true, // Lanza error si se envia algo que no esta en el DTO
    transform: true // Convierte los tipos automaticamente
  }))
  app.use(GlobalMidleware);
  await app.listen(3000);
}
bootstrap();
