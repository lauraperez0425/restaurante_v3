import { Controller, Get, Post, Patch, Delete, Req, Body, Param } from '@nestjs/common';
import { PedidosMSService } from './pedidos-ms.service';

@Controller('microservices/pedidos')
export class PedidosMSController {
  constructor(private readonly pedidosMS: PedidosMSService) {}

  @Get()
  getAll(@Req() req) {
    const token = req.headers.authorization?.split(' ')[1];
    return this.pedidosMS.getAll(token);
  }

  @Post()
  create(@Req() req, @Body() data: any) {
    const token = req.headers.authorization?.split(' ')[1];
    return this.pedidosMS.create(token, data);
  }

  @Patch(':id')
  update(@Req() req, @Param('id') id: number, @Body() data: any) {
    const token = req.headers.authorization?.split(' ')[1];
    return this.pedidosMS.update(token, id, data);
  }

  @Delete(':id')
  delete(@Req() req, @Param('id') id: number) {
    const token = req.headers.authorization?.split(' ')[1];
    return this.pedidosMS.delete(token, id);
  }
}
