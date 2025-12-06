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

    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'mysql',
        host: config.get('DB_HOST'),
        port: parseInt(config.get('DB_PORT') ?? '3306', 10),
        username: config.get('DB_USER'),
        password: config.get('DB_PASS'),
        database: config.get('DB_NAME'),
        autoLoadEntities: true,
        synchronize: false,
      }),
    }),

    // ⭐ Autenticación del Core
    AuthModule,

    // ⭐ Comunicación con microservicios
    OrdersMSModule,  // MS1: pedidos + reservas
    MenuMSModule,    // MS2: categorias + platos

    CustomHttpModule,
  ],
})
export class AppModule {}
