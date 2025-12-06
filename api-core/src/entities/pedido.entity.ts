import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('pedidos')
export class Pedido {
  @PrimaryGeneratedColumn()
  id_pedido: number;

  @Column()
  id_cliente: number;   // 👈 corresponde a tu BD

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  fecha_pedido: Date;

  @Column({ nullable: true })
  id_direccion: number;

  @Column()
  id_tipo_pedido: number;

  @Column()
  id_estado: number;

  @Column({ default: false })
  borrado: boolean;
}
