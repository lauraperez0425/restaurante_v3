import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import { PedidosMSController } from './pedidos-ms.controller';
import { PedidosMSService } from './pedidos-ms.service';

import { ReservasMSController } from './reservas-ms.controller';
import { ReservasMSService } from './reservas-ms.service';

@Module({
  imports: [HttpModule],
  controllers: [
    PedidosMSController,
    ReservasMSController,
  ],
  providers: [
    PedidosMSService,
    ReservasMSService,
  ],
})
export class OrdersMSModule {}
