import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pedido } from './pedido.entity';
import { HttpService } from '@nestjs/axios';


@Injectable()
export class PedidosService {
  constructor(
    @InjectRepository(Pedido) private repo: Repository<Pedido>,
    private readonly http: HttpService
  ) { }

  async crearPedido(data: any) {
    console.log('🧾 Datos recibidos:', data);
    // 🔹 Omitimos validación con auth-service por ahora
    /*
    const userCheck = await this.http.axiosRef.get(
      `http://localhost:3001/auth/verify/${data.usuario_id}`,
    );
    if (!userCheck.data.ok) throw new Error('Usuario no válido');
  
    const platoInfo = await this.http.axiosRef.get(
      `http://localhost:3002/platos/${data.plato_id}`,
    );
    */

    // Simulamos datos de validación
    const pedido = this.repo.create({
      usuario_id: data.usuario_id,
      plato_id: data.plato_id,
      total: data.total, // usa el total que mandas desde Postman
    });

    return this.repo.save(pedido);
  }


  obtenerPedido(id: number) {
    return this.repo.findOneBy({ id });
  }

  // Obtener todos los pedidos
  async obtenerTodos() {
    return this.repo.find();
  }

  // Eliminar pedido
  async eliminarPedido(id: number) {
    const pedido = await this.repo.findOneBy({ id });
    if (!pedido) throw new NotFoundException('Pedido no encontrado');
    return this.repo.remove(pedido);
  }

  // Actualizar estado
  async actualizarEstado(id: number, estado: string) {
    const pedido = await this.repo.findOneBy({ id });
    if (!pedido) throw new NotFoundException('Pedido no encontrado');
    pedido.estado = estado;
    return this.repo.save(pedido);
  }

}
