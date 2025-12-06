import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Plato } from '../../platos/entities/plato.entity';

@Entity('categorias')
export class Categoria {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  nombre: string;

  @OneToMany(() => Plato, (plato) => plato.categoria)
  platos: Plato[];
}
