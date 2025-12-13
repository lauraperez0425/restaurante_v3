import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class ReservasMSService {
  private baseURL = 'http://localhost:3002/api/reservas';
  private authBaseURL = 'http://localhost:3001/api/usuarios';

  constructor(private readonly http: HttpService) {}

  private async enrichReservaWithUser(reserva: any, token: string) {
    try {
      const userRes = await firstValueFrom(
        this.http.get(`${this.authBaseURL}/${reserva.usuario_id}`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
      );
      return { ...reserva, usuario: userRes.data };
    } catch (error) {
      console.error(`Error al obtener usuario ${reserva.usuario_id}:`, error.message);
      return reserva;
    }
  }

  async getAll(token: string) {
    const res = await firstValueFrom(
      this.http.get(this.baseURL, {
        headers: { Authorization: `Bearer ${token}` },
      }),
    );
    
    // Enriquecer todas las reservas con información del usuario
    const reservasConUsuario = await Promise.all(
      res.data.map(reserva => this.enrichReservaWithUser(reserva, token))
    );
    
    return reservasConUsuario;
  }

  async getByUsuario(token: string, usuarioId: number) {
    const res = await firstValueFrom(
      this.http.get(`${this.baseURL}/usuario/${usuarioId}`, {
        headers: { Authorization: `Bearer ${token}` },
      }),
    );
    return res.data;
  }

  async getById(token: string, id: number) {
    const res = await firstValueFrom(
      this.http.get(`${this.baseURL}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      }),
    );
    
    // Enriquecer con información del usuario
    return this.enrichReservaWithUser(res.data, token);
  }

  async create(token: string, data: any) {
    const res = await firstValueFrom(
      this.http.post(this.baseURL, data, {
        headers: { Authorization: `Bearer ${token}` },
      }),
    );
    return res.data;
  }

  async update(token: string, id: number, data: any) {
    const res = await firstValueFrom(
      this.http.patch(`${this.baseURL}/${id}`, data, {
        headers: { Authorization: `Bearer ${token}` },
      }),
    );
    return res.data;
  }

  async delete(token: string, id: number) {
    const res = await firstValueFrom(
      this.http.delete(`${this.baseURL}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      }),
    );
    return res.data;
  }
}
