import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  // Cargar .env
  dotenv.config();

  const app = await NestFactory.create(AppModule);

  // 🌐 Prefijo global
  app.setGlobalPrefix('api');

  // 🔒 Validación global para DTOs
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // 🔹 CORS
  app.enableCors({
    origin: [
      'http://localhost:5173',
      'http://localhost:3000',
      'http://127.0.0.1:5173',
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  // 📘 Swagger para Order-Service
  const config = new DocumentBuilder()
    .setTitle('Order Service - SmartRestaurant')
    .setDescription(
      'Microservicio responsable de órdenes y reservas del restaurante',
    )
    .setVersion('1.0.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description: 'Token enviado desde el API Core',
      },
      'access-token',
    )
    .addTag('Pedidos', 'Gestión de pedidos del cliente')
    .addTag('Reservas', 'Módulo de reservas del restaurante')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  const port = process.env.PORT || 3002;
  await app.listen(port);

  const logger = new Logger('Bootstrap');
  logger.log(`🚀 Order-service corriendo en http://localhost:${port}/api`);
  logger.log(`📘 Swagger disponible en http://localhost:${port}/api/docs`);
}

bootstrap();