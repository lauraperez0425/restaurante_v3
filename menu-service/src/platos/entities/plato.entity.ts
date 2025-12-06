import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Categoria } from '../../categorias/entities/categoria.entity';

@Entity('platos')
export class Plato {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  nombre: string;

  @Column('decimal', { precision: 10, scale: 2 })
  precio: number;

  @Column({ type: 'text', nullable: true })
  descripcion: string;

  @Column({ default: true })
  disponible: boolean;

  @ManyToOne(() => Categoria, (categoria) => categoria.platos, {
    eager: true,
  })
  @JoinColumn({ name: 'categoria_id' })
  categoria: Categoria;
}
