import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AuthMSService {
  private authURL = 'http://localhost:3001/api/auth';

  constructor(private readonly http: HttpService) {}

  async login(data: any) {
    try {
      const response = await firstValueFrom(
        this.http.post(`${this.authURL}/login`, data)
      );
      return response.data;
    } catch (error) {
      // Propagar el error del microservicio
      throw error.response?.data || error;
    }
  }

  async register(data: any) {
    try {
      const response = await firstValueFrom(
        this.http.post(`${this.authURL}/register`, data)
      );
      return response.data;
    } catch (error) {
      // Propagar el error del microservicio
      throw error.response?.data || error;
    }
  }
}