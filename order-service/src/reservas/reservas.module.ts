import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reserva } from './reserva.entity';
import { ReservasService } from './reservas.service';
import { ReservasController } from './reservas.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Reserva])],
  controllers: [ReservasController],
  providers: [ReservasService],
})
export class ReservasModule {}
