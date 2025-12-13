import { Controller, Get, Post, Patch, Delete, Param, Body, Req, UseGuards } from '@nestjs/common';
import { ReservasService } from './reservas.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('reservas')
export class ReservasController {
  constructor(private readonly service: ReservasService) {}

  // Crear reserva
  @UseGuards(JwtAuthGuard)
  @Post()
  crearReserva(@Body() data: any, @Req() req) {
    const usuarioId = req.user.id; // viene del JWT validado
    return this.service.crearReserva({
      ...data,
      usuario_id: usuarioId,
    });
  }

  // Obtener todas las reservas
  @UseGuards(JwtAuthGuard)
  @Get()
  obtenerReservas() {
    return this.service.obtenerReservas();
  }

  // Obtener reservas por usuario
  @UseGuards(JwtAuthGuard)
  @Get('usuario/:usuarioId')
  obtenerReservasPorUsuario(@Param('usuarioId') usuarioId: string) {
    return this.service.obtenerReservasPorUsuario(+usuarioId);
  }

  // Obtener una reserva por ID
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  obtenerReserva(@Param('id') id: string) {
    return this.service.obtenerReserva(+id);
  }

  // Actualizar una reserva
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  actualizarReserva(@Param('id') id: string, @Body() body: any) {
    return this.service.actualizarReserva(+id, body);
  }

  // Eliminar una reserva
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  eliminarReserva(@Param('id') id: string) {
    return this.service.eliminarReserva(+id);
  }
}
