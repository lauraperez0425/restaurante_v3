import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pedido } from './pedido.entity';
import { PedidoDetalle } from './pedido-detalle.entity';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';


@Injectable()
export class PedidosService {
  constructor(
    @InjectRepository(Pedido) private repo: Repository<Pedido>,
    @InjectRepository(PedidoDetalle) private detalleRepo: Repository<PedidoDetalle>,
    private readonly http: HttpService
  ) { }

  async crearPedido(data: any) {
    console.log('🧾 Datos recibidos:', data);
    
    // Validar que venga userId e items
    if (!data.userId || !data.items || data.items.length === 0) {
      throw new Error('Se requiere userId y al menos un item');
    }

    // Calcular total
    const total = data.items.reduce((sum, item) => {
      return sum + (parseFloat(item.precio) * item.cantidad);
    }, 0);

    // Crear el pedido
    const pedido = this.repo.create({
      usuario_id: data.userId,
      total: total,
      estado: 'Pendiente',
    });

    const pedidoGuardado = await this.repo.save(pedido);

    // Crear los detalles
    const detalles = data.items.map(item => {
      return this.detalleRepo.create({
        pedido_id: pedidoGuardado.id,
        plato_id: item.plato_id,
        nombre_plato: item.nombre,
        cantidad: item.cantidad,
        precio_unitario: parseFloat(item.precio),
        subtotal: parseFloat(item.precio) * item.cantidad,
      });
    });

    await this.detalleRepo.save(detalles);

    // Retornar el pedido con sus detalles
    return this.repo.findOne({
      where: { id: pedidoGuardado.id },
      relations: ['detalles'],
    });
  }


  async obtenerPedido(id: number) {
    const pedido = await this.repo.findOne({
      where: { id },
      relations: ['detalles'],
    });

    if (!pedido) {
      return null;
    }

    try {
      const response = await firstValueFrom(
        this.http.get(`http://localhost:3001/api/auth/usuario/${pedido.usuario_id}`)
      );
      console.log('📞 Respuesta del auth-service:', response.data);
      return {
        ...pedido,
        usuario: response.data || null,
      };
    } catch (error) {
      console.error(`❌ Error al obtener usuario ${pedido.usuario_id}:`, error.message);
      return {
        ...pedido,
        usuario: null,
      };
    }
  }

  // Obtener todos los pedidos
  async obtenerTodos() {
    const pedidos = await this.repo.find({
      relations: ['detalles'],
    });

    // Obtener información de usuarios para cada pedido
    const pedidosConUsuario = await Promise.all(
      pedidos.map(async (pedido) => {
        try {
          const response = await firstValueFrom(
            this.http.get(`http://localhost:3001/api/auth/usuario/${pedido.usuario_id}`)
          );
          return {
            ...pedido,
            usuario: response.data || null,
          };
        } catch (error) {
          console.error(`Error al obtener usuario ${pedido.usuario_id}:`, error.message);
          return {
            ...pedido,
            usuario: null,
          };
        }
      })
    );

    return pedidosConUsuario;
  }

  // Obtener pedidos por usuario
  async obtenerPorUsuario(usuario_id: number) {
    return this.repo.find({
      where: { usuario_id },
      relations: ['detalles'],
      order: { fecha: 'DESC' },
    });
  }

  // Eliminar pedido
  async eliminarPedido(id: number) {
    const pedido = await this.repo.findOne({
      where: { id },
      relations: ['detalles'],
    });
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
