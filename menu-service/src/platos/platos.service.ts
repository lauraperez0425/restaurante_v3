import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Plato } from './entities/plato.entity';
import { Categoria } from '../categorias/entities/categoria.entity';

@Injectable()
export class PlatosService {
  constructor(
    @InjectRepository(Plato)
    private platoRepo: Repository<Plato>,
    @InjectRepository(Categoria)
    private categoriaRepo: Repository<Categoria>,
  ) {}

  findAll() {
    return this.platoRepo.find();
  }

  async findOne(id: number) {
    const plato = await this.platoRepo.findOne({ where: { id } });
    if (!plato) throw new NotFoundException('Plato no encontrado');
    return plato;
  }

  async create(data: any) {
    const categoria = await this.categoriaRepo.findOne({
      where: { id: data.categoria_id },
    });
    if (!categoria) throw new NotFoundException('Categoría no válida');

    const nuevo = this.platoRepo.create({
      ...data,
      categoria,
    });
    return this.platoRepo.save(nuevo);
  }

  async update(id: number, data: any) {
    const plato = await this.findOne(id);
    Object.assign(plato, data);
    return this.platoRepo.save(plato);
  }

  async remove(id: number) {
    const plato = await this.findOne(id);
    return this.platoRepo.remove(plato);
  }
}
