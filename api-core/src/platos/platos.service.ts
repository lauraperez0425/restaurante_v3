import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Plato } from '../entities/plato.entity';

@Injectable()
export class PlatosService {
  constructor(
    @InjectRepository(Plato)
    private readonly platoRepo: Repository<Plato>,
  ) {}

  async create(data: Partial<Plato>) {
    // nunca aceptes id_plato desde el body
    delete (data as any).id_plato;

    const nuevo = this.platoRepo.create({
      disponible: true,
      tiempo_preparacion: 0,
      borrado: false,
      ...data,
    });
    return await this.platoRepo.save(nuevo); // INSERT
  }

  async findAll() {
    return await this.platoRepo.find({ where: { borrado: false } });
  }

  async findOne(id: number) {
    const plato = await this.platoRepo.findOne({ where: { id_plato: id, borrado: false } });
    if (!plato) throw new NotFoundException(`Plato ${id} no encontrado`);
    return plato;
  }

  async update(id: number, data: Partial<Plato>) {
    const existe = await this.findOne(id); // valida existencia
    await this.platoRepo.update(existe.id_plato, data);
    return this.findOne(id);
  }

  async remove(id: number) {
    const existe = await this.findOne(id);
    await this.platoRepo.update(existe.id_plato, { borrado: true });
    return { message: `Plato ${id} marcado como borrado` };
  }
}
