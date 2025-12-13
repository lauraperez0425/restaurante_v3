import { Controller, Get, Post, Patch, Delete, Req, Body, Param } from '@nestjs/common';
import { PedidosMSService } from './pedidos-ms.service';

@Controller('pedidos')
export class PedidosMSController {
  constructor(private readonly pedidosMS: PedidosMSService) {}

  @Get()
  getAll(@Req() req) {
    const token = req.headers.authorization?.split(' ')[1];
    return this.pedidosMS.getAll(token);
  }

  @Get('usuario/:usuario_id')
  getByUsuario(@Req() req, @Param('usuario_id') usuario_id: string) {
    const token = req.headers.authorization?.split(' ')[1];
    return this.pedidosMS.getByUsuario(token, +usuario_id);
  }

  @Get(':id')
  getById(@Req() req, @Param('id') id: string) {
    const token = req.headers.authorization?.split(' ')[1];
    return this.pedidosMS.getById(token, +id);
  }

  @Post()
  create(@Req() req, @Body() data: any) {
    const token = req.headers.authorization?.split(' ')[1];
    return this.pedidosMS.create(token, data);
  }

  @Patch(':id')
  update(@Req() req, @Param('id') id: string, @Body() data: any) {
    const token = req.headers.authorization?.split(' ')[1];
    return this.pedidosMS.update(token, +id, data);
  }

  @Delete(':id')
  delete(@Req() req, @Param('id') id: string) {
    const token = req.headers.authorization?.split(' ')[1];
    return this.pedidosMS.delete(token, +id);
  }
}
