import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 🌐 Prefijo global del microservicio
  app.setGlobalPrefix('api');

  // 🔒 Validación global de DTOs
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // 🔹 CORS para permitir requests del frontend o API Core
  app.enableCors({
    origin: [
      'http://localhost:5173',
      'http://localhost:3001',
      'http://127.0.0.1:5173',
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  // 📘 Swagger del auth-service
  const config = new DocumentBuilder()
    .setTitle('Auth Service - SmartRestaurant')
    .setDescription('Microservicio de autenticación y generación de JWT')
    .setVersion('1.0.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description: 'Token generado por /auth/login',
      },
      'access-token',
    )
    .addTag('Auth', 'Endpoints del microservicio de autenticación')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(3001);
  console.log('🚀 Auth-service corriendo en http://localhost:3001/api');
  console.log('📘 Swagger: http://localhost:3001/api/docs');
}

bootstrap();