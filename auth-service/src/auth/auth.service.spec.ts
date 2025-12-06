import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Usuario } from '../usuarios/usuario.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuariosRepo: Repository<Usuario>,
  ) { }

  async register(data: any) {
    const { nombre, apellido, email, password, telefono } = data;

    // Verificar si el correo ya existe
    const existe = await this.usuariosRepo.findOne({ where: { email } });
    if (existe) throw new Error('El correo ya está registrado');

    // Encriptar contraseña
    const hash = await bcrypt.hash(password, 10);

    const nuevo = this.usuariosRepo.create({
      nombre_usuario: nombre,       
      apellido_usuario: apellido,   
      email,
      password_hash: hash,          
      telefono,
      id_rol: 2,                    // cliente por defecto
    });

    return this.usuariosRepo.save(nuevo)
  }
}
