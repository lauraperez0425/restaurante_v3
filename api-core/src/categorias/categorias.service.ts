import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Categoria } from '../entities/categoria.entity';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';

@Injectable()
export class CategoriasService {
  constructor(
    @InjectRepository(Categoria)
    private readonly categoriaRepo: Repository<Categoria>,
  ) {}

  async create(dto: CreateCategoriaDto): Promise<Categoria> {
    const categoria = this.categoriaRepo.create(dto);
    return await this.categoriaRepo.save(categoria);
  }

  async findAll(): Promise<Categoria[]> {
    return await this.categoriaRepo.find({ where: { borrado: false } });
  }

  async findOne(id: number): Promise<Categoria> {
    const categoria = await this.categoriaRepo.findOne({ where: { id_categoria: id, borrado: false } });
    if (!categoria) {
      throw new NotFoundException(`Categoría con id ${id} no encontrada`);
    }
    return categoria;
  }

  async update(id: number, dto: UpdateCategoriaDto): Promise<Categoria> {
    const categoria = await this.findOne(id);
    Object.assign(categoria, dto);
    return await this.categoriaRepo.save(categoria);
  }

  async remove(id: number): Promise<void> {
    const categoria = await this.findOne(id);
    categoria.borrado = true; // borrado lógico
    await this.categoriaRepo.save(categoria);
  }
}
