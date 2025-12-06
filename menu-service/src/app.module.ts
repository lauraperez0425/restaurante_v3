import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { PlatosModule } from './platos/platos.module';
import { CategoriasModule } from './categorias/categorias.module';

import { AuthModule } from './auth/auth.module';   // ⭐ NECESARIO para JWT + roles

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),

    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: 3306,
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      synchronize: true,
    }),

    AuthModule,         // ⭐ REGISTRA JwtStrategy + JwtAuthGuard + RolesGuard
    PlatosModule,
    CategoriasModule,
  ],
})
export class AppModule {}
