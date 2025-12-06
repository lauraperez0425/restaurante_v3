import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class PlatosMSService {
  private baseURL = 'http://localhost:3003/api/platos';

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
    const res = await firstValueFrom(
      this.http.delete(`${this.baseURL}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      }),
    );
    return res.data;
  }
}
