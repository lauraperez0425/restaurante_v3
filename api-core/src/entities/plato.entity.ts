import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

const decimalToNumber = {
  to: (value: number) => value,
  from: (value: string | null) => (value === null ? null : parseFloat(value)),
};

@Entity('platos')
export class Plato {
  @PrimaryGeneratedColumn()
  id_plato: number;

  @Column()
  id_categoria: number; // FK a categorias (mantenemos como number para evitar relaciones por ahora)

  @Column({ length: 150 })
  nombre: string;

  @Column({ length: 500, nullable: true })
  descripcion?: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, transformer: decimalToNumber })
  precio: number;

  @Column({ type: 'bool', default: true })
  disponible: boolean;

  @Column({ type: 'int', default: 0 }) // minutos de preparación
  tiempo_preparacion: number;

  @Column({ type: 'bool', default: false })
  borrado: boolean;
}
