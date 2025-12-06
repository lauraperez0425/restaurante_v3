import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';

@Injectable()
export class CategoriasMSService {
  private baseURL = 'http://localhost:3003/api/categorias';

  constructor(private readonly http: HttpService) {}

  async getAll(token: string) {
    const res = await firstValueFrom(
      this.http.get(this.baseURL, {
        headers: { Authorization: `Bearer ${token}` },
      }),
    );
    return res.data;
  }

  async getOne(token: string, id: number) {
    const res = await firstValueFrom(
      this.http.get(`${this.baseURL}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      }),
    );
    return res.data;
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
    try {
      const res = await firstValueFrom(
        this.http.delete(`${this.baseURL}/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
      );
      return res.data;
    } catch (error) {
      // Propagar el error del microservicio
      if (error instanceof AxiosError && error.response) {
        throw new HttpException(
          error.response.data,
          error.response.status || HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
      throw error;
    }
  }
}
