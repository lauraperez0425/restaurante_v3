import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AuthMSService {
  private authURL = 'http://localhost:3001/api/auth';

  constructor(private readonly http: HttpService) {}

  async login(data: any) {
    const response = await firstValueFrom(
      this.http.post(`${this.authURL}/login`, data, {
        validateStatus: () => true, // <-- Aceptar 200, 201, etc.
      })
    );

    return response.data;
  }

  async register(data: any) {
    const response = await firstValueFrom(
      this.http.post(`${this.authURL}/register`, data, {
        validateStatus: () => true, // <-- Muy importante
      })
    );

    return response.data;
  }
}