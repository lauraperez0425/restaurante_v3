import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Reserva } from 'src/entities/reserva.entity';

@Entity('mesas')
export class Mesa {
  @PrimaryGeneratedColumn()
  id_mesa: number;

  @Column()
  numero: number;

  @Column()
  capacidad: number;

  @Column({ default: true })
  disponible: boolean;

  @OneToMany(() => Reserva, (reserva) => reserva.mesa)
  reservas: Reserva[];
}
