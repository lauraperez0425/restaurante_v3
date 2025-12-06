import { Controller, Get, Post, Delete, Patch, Param, Body, Request, UseGuards } from '@nestjs/common';
import { PedidosService } from './pedidos.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('pedidos')
export class PedidosController {
  constructor(private readonly service: PedidosService) {}

  // Crear pedido
  @UseGuards(JwtAuthGuard)
  @Post()
  async crearPedido(@Body() data: any, @Request() req) {
    console.log('📦 Token decodificado:', req.user); 
    const usuarioId = req.user?.id;

    return this.service.crearPedido({ ...data, usuario_id: usuarioId });
  }

  // Obtener todos los pedidos
  @UseGuards(JwtAuthGuard)
  @Get()
  obtenerTodos() {
    return this.service.obtenerTodos();
  }

  // Obtener pedido por ID
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  obtenerPedido(@Param('id') id: number) {
    return this.service.obtenerPedido(id);
  }

  // Eliminar pedido
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  eliminarPedido(@Param('id') id: number) {
    return this.service.eliminarPedido(id);
  }

  // Actualizar estado del pedido
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  actualizarEstado(@Param('id') id: number, @Body('estado') estado: string) {
    return this.service.actualizarEstado(id, estado);
  }
}
