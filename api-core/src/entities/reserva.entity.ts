import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Cliente } from 'src/entities/cliente.entity';
import { Mesa } from 'src/entities/mesa.entity';
import { EstadoReserva } from 'src/entities/estado_reserva.entity';

@Entity('reservas')
export class Reserva {
  @PrimaryGeneratedColumn()
  id_reserva: number;

  @ManyToOne(() => Cliente)
  @JoinColumn({ name: 'id_cliente' })
  cliente: Cliente;

  @Column({ type: 'date' })
  fecha_reserva: string;

  @Column({ type: 'time' })
  hora_inicio: string;

  @Column({ type: 'time' })
  hora_fin: string;

  @Column({ type: 'int' })
  cantidad_personas: number;

  @ManyToOne(() => EstadoReserva)
  @JoinColumn({ name: 'id_estado_reserva' })
  estado: EstadoReserva;

  @ManyToOne(() => Mesa, { nullable: true })
  @JoinColumn({ name: 'id_mesa' })
  mesa?: Mesa;

  @Column({ type: 'tinyint', default: 0 })
  borrado: number;
}
