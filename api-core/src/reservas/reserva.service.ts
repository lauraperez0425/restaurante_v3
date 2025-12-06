import { Injectable } from '@nestjs/common';

@Injectable()
export class ReservaService {
  private reservas = [
    { id: 1, cliente: 'Laura Pérez', fecha: '2025-10-15', hora: '12:00', personas: 2 },
    { id: 2, cliente: 'Juan López', fecha: '2025-10-16', hora: '13:00', personas: 4 },
    { id: 3, cliente: 'María Gómez', fecha: '2025-10-17', hora: '19:00', personas: 3 },
  ];

  findAll() {
    return this.reservas;
  }

  findOne(id: number) {
    return this.reservas.find((r) => r.id === id);
  }

  create(body: any) {
    const nueva = { id: this.reservas.length + 1, ...body };
    this.reservas.push(nueva);
    return { message: 'Reserva creada', reserva: nueva };
  }

  update(id: number, body: any) {
    const index = this.reservas.findIndex((r) => r.id === id);
    if (index === -1) return { message: 'Reserva no encontrada' };
    this.reservas[index] = { ...this.reservas[index], ...body };
    return { message: 'Reserva actualizada', reserva: this.reservas[index] };
  }

  remove(id: number) {
    this.reservas = this.reservas.filter((r) => r.id !== id);
    return { message: 'Reserva eliminada' };
  }
}
