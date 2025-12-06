import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pedido } from '../entities/pedido.entity';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { UpdatePedidoDto } from './dto/update-pedido.dto';

@Injectable()
export class PedidosService {
  constructor(
    @InjectRepository(Pedido)
    private readonly pedidoRepo: Repository<Pedido>,
  ) {}

  async create(data: CreatePedidoDto) {
    const nuevo = this.pedidoRepo.create({
      borrado: false,
      ...data,
    });
    return await this.pedidoRepo.save(nuevo);
  }

  async findAll() {
    return await this.pedidoRepo.find({ where: { borrado: false } });
  }

  async findOne(id: number) {
    const pedido = await this.pedidoRepo.findOne({ where: { id_pedido: id, borrado: false } });
    if (!pedido) throw new NotFoundException(`Pedido ${id} no encontrado`);
    return pedido;
  }

  async update(id: number, data: UpdatePedidoDto) {
    const existe = await this.findOne(id);
    await this.pedidoRepo.update(existe.id_pedido, data);
    return this.findOne(id);
  }

  async remove(id: number) {
    const existe = await this.findOne(id);
    await this.pedidoRepo.update(existe.id_pedido, { borrado: true });
    return { message: `Pedido ${id} marcado como borrado` };
  }
}
