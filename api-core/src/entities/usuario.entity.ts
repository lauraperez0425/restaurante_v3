import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Rol } from './rol.entity';

@Entity('usuarios')
export class Usuario {
  @PrimaryGeneratedColumn()
  id_usuario: number;

  @Column()
  nombre: string;

  @Column()
  apellido: string;

  @Column()
  email: string;

  @Column()
  password_hash: string;

  @Column()
  telefono: string;

  @Column()
  id_rol: number;

  @ManyToOne(() => Rol, { eager: true })
  @JoinColumn({ name: 'id_rol' })
  rol: Rol;


  @Column({ default: false })
  borrado: boolean;
}
