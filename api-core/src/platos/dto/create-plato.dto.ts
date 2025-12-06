import { IsBoolean, IsInt, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, Length, Min } from 'class-validator';

export class CreatePlatoDto {
  @IsInt()
  @Min(1)
  id_categoria: number;

  @IsString()
  @IsNotEmpty()
  @Length(2, 150)
  nombre: string;

  @IsOptional()
  @IsString()
  @Length(0, 500)
  descripcion?: string;

  @IsNumber({ maxDecimalPlaces: 2 })
  @IsPositive()
  precio: number;

  @IsOptional()
  @IsBoolean()
  disponible?: boolean;

  @IsOptional()
  @IsInt()
  @Min(0)
  tiempo_preparacion?: number;
}
