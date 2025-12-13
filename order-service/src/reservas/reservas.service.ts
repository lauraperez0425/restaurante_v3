import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Reserva } from './reserva.entity';

@Injectable()
export class ReservasService {
  constructor(
    @InjectRepository(Reserva)
    private readonly reservasRepo: Repository<Reserva>,
  ) {}

  // Crear reserva
  async crearReserva(data: any) {
    const nueva = this.reservasRepo.create({
      usuario_id: data.usuario_id,
      fecha: data.fecha,
      hora: data.hora,
      estado: data.estado || 'pendiente',
    });

    return this.reservasRepo.save(nueva);
  }

  // Obtener todas
  obtenerReservas() {
    return this.reservasRepo.find();
  }

  // Obtener por usuario
  obtenerReservasPorUsuario(usuarioId: number) {
    return this.reservasRepo.find({ where: { usuario_id: usuarioId } });
  }

  // Obtener una
  async obtenerReserva(id: number) {
    const reserva = await this.reservasRepo.findOne({ where: { id } });

    if (!reserva)
      throw new NotFoundException('Reserva no encontrada');

    return reserva;
  }

  // Actualizar
  async actualizarReserva(id: number, data: any) {
    const reserva = await this.obtenerReserva(id);

    Object.assign(reserva, data);

    return this.reservasRepo.save(reserva);
  }

  // Eliminar
  async eliminarReserva(id: number) {
    const result = await this.reservasRepo.delete(id);

    if (result.affected === 0)
      throw new NotFoundException('Reserva no encontrada');

    return { ok: true, mensaje: 'Reserva eliminada correctamente' };
  }
}
