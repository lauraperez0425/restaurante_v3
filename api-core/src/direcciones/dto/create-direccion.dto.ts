import { IsNotEmpty, IsOptional, IsString, IsNumber } from 'class-validator';

export class CreateDireccionDto {
  @IsNotEmpty()
  id_cliente: number;

  @IsNotEmpty()
  @IsString()
  direccion_texto: string;

  @IsOptional()
  @IsNumber()
  latitud?: number;

  @IsOptional()
  @IsNumber()
  longitud?: number;

  @IsOptional()
  @IsString()
  referencia?: string;
}
