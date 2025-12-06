import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('categorias')
export class Categoria {
  @PrimaryGeneratedColumn()
  id_categoria: number;

  @Column({ length: 100 })
  nombre: string;

  @Column({ type: 'text', nullable: true })
  descripcion: string;

  @Column({ type: 'tinyint', default: 0 })
  borrado: boolean;
}
