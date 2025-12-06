import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Direccion } from '../entities/direccion.entity';
import { CreateDireccionDto } from './dto/create-direccion.dto';
import { UpdateDireccionDto } from './dto/update-direccion.dto';

@Injectable()
export class DireccionesService {
  constructor(
    @InjectRepository(Direccion)
    private readonly direccionRepo: Repository<Direccion>,
  ) {}

  async create(dto: CreateDireccionDto): Promise<Direccion> {
    const direccion = this.direccionRepo.create(dto);
    return await this.direccionRepo.save(direccion);
  }

  async findAll(): Promise<Direccion[]> {
    return await this.direccionRepo.find({ where: { borrado: false } });
  }

  async findOne(id: number): Promise<Direccion> {
    const direccion = await this.direccionRepo.findOne({ where: { id_direccion: id, borrado: false } });
    if (!direccion) throw new NotFoundException(`Dirección con id ${id} no encontrada`);
    return direccion;
  }

  async update(id: number, dto: UpdateDireccionDto): Promise<Direccion> {
    const direccion = await this.findOne(id);
    Object.assign(direccion, dto);
    return await this.direccionRepo.save(direccion);
  }

  async remove(id: number): Promise<void> {
    const direccion = await this.findOne(id);
    direccion.borrado = true; // borrado lógico
    await this.direccionRepo.save(direccion);
  }
}
