import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('usuarios')
export class Usuario {
  @PrimaryGeneratedColumn({ name: 'id_usuario' })
  id_usuario: number;

  @Column({ name: 'nombre_usuario' })
  nombre_usuario: string;

  @Column({ name: 'apellido_usuario' })
  apellido_usuario: string;

  @Column({ unique: true })
  email: string;

  @Column({ name: 'password_hash' })
  password_hash: string;

  @Column({ nullable: true })
  telefono: string;

  @Column({ name: 'id_rol', default: 2 })
  id_rol: number;

  @Column({ default: 0 })
  borrado: number;
}
