import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Reserva } from 'src/entities/reserva.entity';

@Entity('clientes')
export class Cliente {
  @PrimaryGeneratedColumn()
  id_cliente: number;

  @Column({ length: 100 })
  nombre: string;

  @Column({ length: 100 })
  correo: string;

  @Column({ length: 20 })
  telefono: string;

  @OneToMany(() => Reserva, (reserva) => reserva.cliente)
  reservas: Reserva[];
}
