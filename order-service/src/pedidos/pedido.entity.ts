import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { PedidoDetalle } from './pedido-detalle.entity';

@Entity()
export class Pedido {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  usuario_id: number;

  @Column('decimal', { precision: 10, scale: 2 })
  total: number;

  @Column({ default: 'Pendiente' })
  estado: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  fecha: Date;

  @OneToMany(() => PedidoDetalle, detalle => detalle.pedido, { cascade: true, eager: true })
  detalles: PedidoDetalle[];
}
