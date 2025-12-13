import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from './usuario.entity';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuariosRepo: Repository<Usuario>,
  ) {}

  async obtenerUsuario(id: number) {
    const usuario = await this.usuariosRepo.findOne({ where: { id_usuario: id } });
    
    if (!usuario) {
      throw new NotFoundException('Usuario no encontrado');
    }

    // No devolver la contraseña
    const { password_hash, ...usuarioSinPassword } = usuario;
    return {
      ...usuarioSinPassword,
      id: usuario.id_usuario,
      nombre: usuario.nombre_usuario,
      apellido: usuario.apellido_usuario,
      rol: usuario.id_rol
    };
  }
}
