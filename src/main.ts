import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { GlobalMidleware } from './logger-middleware/logger-middleware.middleware';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(GlobalMidleware);
  await app.listen(3000);
}
bootstrap();
