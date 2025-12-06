import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlatosService } from './platos.service';
import { PlatosController } from './platos.controller';
import { Plato } from './entities/plato.entity';
import { Categoria } from '../categorias/entities/categoria.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Plato, Categoria])],
  controllers: [PlatosController],
  providers: [PlatosService],
  exports: [PlatosService],
})
export class PlatosModule {}
