import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Plato } from '../entities/plato.entity'; // o './entities/plato.entity' si lo pusiste dentro del módulo
import { PlatosService } from './platos.service';
import { PlatosController } from './platos.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Plato])],
  controllers: [PlatosController],
  providers: [PlatosService],
})
export class PlatosModule {}
