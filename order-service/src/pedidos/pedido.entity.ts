import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Pedido {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  usuario_id: number;

  @Column()
  plato_id: number;

  @Column('decimal', { precision: 10, scale: 2 })
  total: number;

  @Column({ default: 'pendiente' })
  estado: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  fecha: Date;
}
