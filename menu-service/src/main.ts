import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 🌐 Prefijo global
  app.setGlobalPrefix('api');

  // 🔒 Validación global de DTOs
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // 🔹 CORS para permitir solicitudes desde frontend o api-core
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

  // 📘 Configuración de Swagger para el menú
  const config = new DocumentBuilder()
    .setTitle('Menu Service - SmartRestaurant')
    .setDescription('Microservicio encargado de la gestión de platos y categorías')
    .setVersion('1.0.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description: 'Token enviado por el API Core para rutas protegidas',
      },
      'access-token',
    )
    .addTag('Platos', 'Operaciones sobre platos del restaurante')
    .addTag('Categorías', 'Gestión de categorías de platos')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(3003);
  console.log('🚀 Menu-service corriendo en http://localhost:3003/api');
  console.log('📘 Swagger: http://localhost:3003/api/docs');
}

bootstrap();