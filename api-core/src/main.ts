import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 🌐 PREFIX GLOBAL PARA TODA LA API
  app.setGlobalPrefix('api');

  // 🔒 Validación global para todos los DTOs (recomendado)
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,    // elimina datos que no estén en el DTO
      forbidNonWhitelisted: true, 
      transform: true,    // convierte tipos (string → number)
    }),
  );

  // 🔹 CORS para permitir requests del frontend
  app.enableCors({
    origin: [
      'http://localhost:5173',
      'http://127.0.0.1:5173',
      'http://localhost:3000',
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  // 🔹 Configuración de Swagger
  const config = new DocumentBuilder()
    .setTitle('🍽️ SmartRestaurant API')
    .setDescription(
      'Documentación interactiva de la arquitectura distribuida del restaurante (API-Core + Microservicios)',
    )
    .setVersion('1.0.0')

    // 🎯 Seguridad: agrega el esquema de autenticación Bearer JWT
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description: 'Introduce el token devuelto por /auth/login',
      },
      'access-token', // nombre interno del esquema
    )

    // 📌 (Opcional) Se pueden agregar tags globales
    .addTag('Auth', 'Endpoints de autenticación')
    .addTag('Platos', 'Gestión de platos y categorías')
    .addTag('Pedidos', 'Endpoints del microservicio de órdenes')

    .build();

  const document = SwaggerModule.createDocument(app, config);

  // 📘 Ruta donde Swagger estará disponible
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(3000);
  console.log(`🚀 Servidor corriendo en http://localhost:3000/api`);
  console.log(`📘 Swagger disponible en http://localhost:3000/api/docs`);
}

bootstrap();