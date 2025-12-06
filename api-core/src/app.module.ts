import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { AuthModule } from './auth/auth.module';

// ⭐ Módulos de comunicación con microservicios
import { OrdersMSModule } from './microservices/orders/orders-ms.module';
import { MenuMSModule } from './microservices/menu/menu-ms.module';

// ⭐ Módulo para HttpService
import { CustomHttpModule } from './http/http.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),

    // ⭐ Autenticación del Core
    AuthModule,

    // ⭐ Comunicación con microservicios
    OrdersMSModule,  // MS1: pedidos + reservas
    MenuMSModule,    // MS2: categorias + platos

    CustomHttpModule,
  ],
})
export class AppModule {}
