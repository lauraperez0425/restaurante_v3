import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';   // ✅ importa el módulo HTTP
import { Pedido } from './pedido.entity';
import { PedidoDetalle } from './pedido-detalle.entity';
import { PedidosService } from './pedidos.service';
import { PedidosController } from './pedidos.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Pedido, PedidoDetalle]),
    HttpModule,   // ✅ agrega aquí
  ],
  providers: [PedidosService],
  controllers: [PedidosController],
})
export class PedidosModule {}
