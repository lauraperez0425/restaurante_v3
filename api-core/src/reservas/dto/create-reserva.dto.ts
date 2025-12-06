import { IsNotEmpty, IsOptional, IsInt, IsDateString, IsNumber } from 'class-validator';

export class CreateReservaDto {
  @IsNotEmpty()
  @IsInt()
  id_cliente: number;

  @IsNotEmpty()
  @IsDateString()
  fecha_reserva: string;

  @IsNotEmpty()
  hora_inicio: string;

  @IsNotEmpty()
  hora_fin: string;

  @IsNotEmpty()
  @IsInt()
  cantidad_personas: number;

  @IsNotEmpty()
  @IsInt()
  id_estado_reserva: number;

  @IsOptional()
  @IsInt()
  id_mesa?: number;
}
