import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Reserva } from 'src/entities/reserva.entity';

@Entity('estados_reserva')
export class EstadoReserva {
  @PrimaryGeneratedColumn()
  id_estado: number;

  @Column()
  nombre: string;

  @OneToMany(() => Reserva, (reserva) => reserva.estado)
  reservas: Reserva[];
}
