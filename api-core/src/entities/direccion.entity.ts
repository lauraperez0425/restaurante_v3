import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('direcciones')
export class Direccion {
  @PrimaryGeneratedColumn()
  id_direccion: number;

  @Column()
  id_cliente: number;

  @Column({ length: 255 })
  direccion_texto: string;

  @Column({ type: 'decimal', precision: 10, scale: 8, nullable: true })
  latitud: number;

  @Column({ type: 'decimal', precision: 11, scale: 8, nullable: true })
  longitud: number;

  @Column({ length: 255, nullable: true })
  referencia: string;

  @Column({ type: 'tinyint', default: 0 })
  borrado: boolean;
}
