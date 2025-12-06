import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('reservas')
export class Reserva {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  usuario_id: number;

  @Column()
  fecha: string;   // formato: YYYY-MM-DD

  @Column()
  hora: string;    // formato: HH:mm

  @Column()
  estado: string;  // pendiente | confirmada | cancelada

  @CreateDateColumn({ name: 'creado_en' })
  creado_en: Date;
}
