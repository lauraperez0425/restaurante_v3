import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from '../entities/usuario.entity';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepo: Repository<Usuario>,
  ) {}

  async create(data: Partial<Usuario>): Promise<Usuario> {
    const nuevo = this.usuarioRepo.create(data);
    return this.usuarioRepo.save(nuevo);
  }

  async findAll(): Promise<Usuario[]> {
    return this.usuarioRepo.find();
  }

  async findOne(id: number): Promise<Usuario | null> {
    return this.usuarioRepo.findOne({ where: { id_usuario: id } });
  }

  // 👇 IMPORTANTE: un solo usuario, no un array
  async findByEmail(email: string): Promise<Usuario | null> {
    return this.usuarioRepo.findOne({ where: { email } });
  }

  async update(id: number, data: Partial<Usuario>): Promise<Usuario> {
    const u = await this.findOne(id);
    if (!u) throw new Error(`Usuario ${id} no encontrado`);
    Object.assign(u, data);
    return this.usuarioRepo.save(u);
  }

  async remove(id: number): Promise<void> {
    const u = await this.findOne(id);
    if (u) {
      u.borrado = true as any; // si lo definiste tinyint
      await this.usuarioRepo.save(u);
    }
  }
}
