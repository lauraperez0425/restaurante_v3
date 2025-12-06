import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Categoria } from './entities/categoria.entity';

@Injectable()
export class CategoriasService {
  constructor(
    @InjectRepository(Categoria)
    private categoriaRepo: Repository<Categoria>,
  ) {}

  findAll() {
    return this.categoriaRepo.find();
  }

  async findOne(id: number) {
    const cat = await this.categoriaRepo.findOne({ where: { id } });
    if (!cat) throw new NotFoundException('Categoría no encontrada');
    return cat;
  }

  create(data: any) {
    const nueva = this.categoriaRepo.create(data);
    return this.categoriaRepo.save(nueva);
  }

  async update(id: number, data: any) {
    const cat = await this.findOne(id);
    Object.assign(cat, data);
    return this.categoriaRepo.save(cat);
  }

  async remove(id: number) {
    const cat = await this.categoriaRepo.findOne({ 
      where: { id },
      relations: ['platos']
    });
    
    if (!cat) {
      throw new NotFoundException('Categoría no encontrada');
    }

    if (cat.platos && cat.platos.length > 0) {
      throw new BadRequestException(
        `No se puede eliminar la categoría "${cat.nombre}" porque tiene ${cat.platos.length} plato(s) asociado(s). Elimina o reasigna los platos primero.`
      );
    }

    return this.categoriaRepo.remove(cat);
  }
}
