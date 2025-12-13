import { Module, MiddlewareConsumer, NestModule, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { ReservasModule } from './reservas/reservas.module';
import { Reserva } from './reservas/reserva.entity';

import { PedidosModule } from './pedidos/pedidos.module';
import { Pedido } from './pedidos/pedido.entity';
import { PedidoDetalle } from './pedidos/pedido-detalle.entity';

import { AuthModule } from './auth/auth.module';
import { AuthMiddleware } from './auth/auth.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),

    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: 3306,
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      entities: [Pedido, PedidoDetalle, Reserva],
      synchronize: true,
    }),

    AuthModule,
    PedidosModule,
    ReservasModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(
      { path: 'pedidos', method: RequestMethod.ALL },
      { path: 'reservas', method: RequestMethod.ALL },
    );
  }
}
