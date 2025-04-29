import { INestApplication } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

export function setupSwagger(app: INestApplication): void{
    const config = new DocumentBuilder()
    .setTitle('API de E-Commerce - Bootcamp Henry')
    .setDescription('Documentación de la API para gestión de usuarios, productos, órdenes y autenticación')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);
}